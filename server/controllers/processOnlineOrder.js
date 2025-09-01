import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
import AddressModel from "../models/address.model.js";
import CartProductModel from "../models/cartproduct.model.js";
import sendEmail from "../config/sendEmail.js";
import orderConfirmationTemplate from "../utils/orderConfirmationTemplate.js";
import mongoose from "mongoose";

export async function processOnlineOrderController(request, response) {
    try {
        const { sessionId } = request.body;
        const userId = request.userId;

        console.log('Processing online order - SessionId:', sessionId, 'UserId:', userId);

        if (!sessionId) {
            return response.status(400).json({
                message: "Session ID is required",
                error: true,
                success: false
            });
        }

        // Check if order already processed
        const existingOrder = await OrderModel.findOne({ paymentId: sessionId });
        if (existingOrder) {
            return response.json({
                message: "Order already processed",
                error: false,
                success: true
            });
        }

        // Get cart items before clearing
        const cartItems = await CartProductModel.find({ userId }).populate('productId');
        
        if (!cartItems.length) {
            return response.status(400).json({
                message: "No cart items found",
                error: true,
                success: false
            });
        }

        // Get user and address
        const user = await UserModel.findById(userId);
        const userAddresses = await AddressModel.find({ userId, status: true });
        const primaryAddress = userAddresses[0]; // Use first active address

        // Validate stock before processing
        for (const item of cartItems) {
            if (item.productId.stock < item.quantity) {
                return response.status(400).json({
                    message: `Insufficient stock for ${item.productId.name}`,
                    error: true,
                    success: false
                });
            }
        }

        // Create order
        const orderData = cartItems.map(item => ({
            userId: userId,
            orderId: `ORD-${new mongoose.Types.ObjectId()}`,
            productId: item.productId._id,
            product_details: {
                name: item.productId.name,
                image: item.productId.image
            },
            paymentId: sessionId,
            payment_status: "PAID",
            delivery_address: primaryAddress._id,
            subTotalAmt: item.productId.price * item.quantity,
            totalAmt: item.productId.price * item.quantity,
            quantity: item.quantity
        }));

        const order = await OrderModel.insertMany(orderData);

        // Update stock
        for (const item of cartItems) {
            await ProductModel.updateOne(
                { _id: item.productId._id },
                { $inc: { stock: -item.quantity } }
            );
        }

        // Send email
        if (user && primaryAddress) {
            const totalAmount = cartItems.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);
            
            try {
                const emailHtml = orderConfirmationTemplate({
                    userName: user.name,
                    orderId: order[0].orderId,
                    totalAmount: totalAmount,
                    address: primaryAddress
                });
                
                await sendEmail({
                    sendTo: user.email,
                    subject: "Order Confirmation - FreshOra",
                    html: emailHtml
                });
                console.log('Order confirmation email sent successfully');
            } catch (emailError) {
                console.error('Failed to send email:', emailError);
                // Don't fail the order if email fails
            }
        }

        // Clear cart
        await CartProductModel.deleteMany({ userId });
        await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });

        return response.json({
            message: "Order processed successfully",
            error: false,
            success: true,
            data: order
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}