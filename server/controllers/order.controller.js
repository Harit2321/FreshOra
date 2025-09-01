import Stripe from "../config/stripe.js";
import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
import AddressModel from "../models/address.model.js";
import sendEmail from "../config/sendEmail.js";
import orderConfirmationTemplate from "../utils/orderConfirmationTemplate.js";
import mongoose from "mongoose";

export async function CashOnDeliveryOrderController(request, response) {
    try {
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId, subTotalAmt } = request.body

        // Validate required fields
        if (!list_items || !Array.isArray(list_items) || list_items.length === 0) {
            return response.status(400).json({
                message: "Please add some products to your cart before placing an order.",
                error: true,
                success: false
            })
        }
        if (!addressId) {
            return response.status(400).json({
                message: "Please select a delivery address before placing an order.",
                error: true,
                success: false
            })
        }

        // Validate each item has required product data
        for (const item of list_items) {
            if (!item.productId || !item.productId._id) {
                return response.status(400).json({
                    message: "Invalid product data in cart. Please refresh and try again.",
                    error: true,
                    success: false
                })
            }
        }

        // Validate stock availability
        for (const item of list_items) {
            const product = await ProductModel.findById(item.productId._id)
            if (!product || product.stock < item.quantity) {
                return response.status(400).json({
                    message: `Insufficient stock for ${item.productId.name}. Available: ${product?.stock || 0}, Requested: ${item.quantity}`,
                    error: true,
                    success: false
                })
            }
        }

        // Validate address completeness
        const address = await AddressModel.findById(addressId)
        if (!address || !address.address_line || !address.city || !address.state || !address.pincode || !address.country || !address.mobile) {
            return response.status(400).json({
                message: "Selected address is incomplete. Please add a complete address with all required fields.",
                error: true,
                success: false
            })
        }

        const payload = list_items.map(el => {
            return ({
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: el.productId._id,
                product_details: {
                    name: el.productId.name,
                    image: el.productId.image
                },
                paymentId: "",
                payment_status: "CASH ON DELIVERY",
                delivery_address: addressId,
                subTotalAmt: subTotalAmt,
                totalAmt: totalAmt,
            })
        })

        const generatedOrder = await OrderModel.insertMany(payload)

        // Update product stock
        for (const item of list_items) {
            await ProductModel.updateOne(
                { _id: item.productId._id },
                { $inc: { stock: -item.quantity } }
            )
        }

        // Send order confirmation email
        try {
            const user = await UserModel.findById(userId)
            const orderAddress = await AddressModel.findById(addressId)
            
            console.log('Email attempt - User:', user?.email, 'Address:', orderAddress?._id)
            
            if (user && orderAddress) {
                const emailHtml = orderConfirmationTemplate({
                    userName: user.name,
                    orderId: generatedOrder[0].orderId,
                    totalAmount: totalAmt,
                    address: orderAddress
                })
                
                await sendEmail({
                    sendTo: user.email,
                    subject: "Order Confirmation - FreshOra",
                    html: emailHtml
                })
                console.log('Email sent successfully to:', user.email)
            }
        } catch (emailError) {
            console.error('Email sending failed:', emailError)
        }

        ///remove from the cart
        const removeCartItems = await CartProductModel.deleteMany({ userId: userId })
        const updateInUser = await UserModel.updateOne({ _id: userId }, { shopping_cart: [] })

        return response.json({
            message: "Order successfully",
            error: false,
            success: true,
            data: generatedOrder
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const pricewithDiscount = (price, dis = 1) => {
    const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100)
    const actualPrice = Number(price) - Number(discountAmout)
    return actualPrice
}

export async function paymentController(request, response) {
    try {
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId, subTotalAmt } = request.body

        // Validate required fields
        if (!list_items || !Array.isArray(list_items) || list_items.length === 0) {
            return response.status(400).json({
                message: "Please add some products to your cart before placing an order.",
                error: true,
                success: false
            })
        }

        if (!addressId) {
            return response.status(400).json({
                message: "Please select a delivery address before placing an order.",
                error: true,
                success: false
            })
        }

        // Validate each item has required product data
        for (const item of list_items) {
            if (!item.productId || !item.productId._id) {
                return response.status(400).json({
                    message: "Invalid product data in cart. Please refresh and try again.",
                    error: true,
                    success: false
                })
            }
        }

        // Validate stock availability
        for (const item of list_items) {
            const product = await ProductModel.findById(item.productId._id)
            if (!product || product.stock < item.quantity) {
                return response.status(400).json({
                    message: `Insufficient stock for ${item.productId.name}. Available: ${product?.stock || 0}, Requested: ${item.quantity}`,
                    error: true,
                    success: false
                })
            }
        }

        // Validate address completeness
        const address = await AddressModel.findById(addressId)
        if (!address || !address.address_line || !address.city || !address.state || !address.pincode || !address.country || !address.mobile) {
            return response.status(400).json({
                message: "Selected address is incomplete. Please add a complete address with all required fields.",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findById(userId)

        const line_items = list_items.map(item => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.productId.name,
                        images: item.productId.image,
                        metadata: {
                            productId: item.productId._id
                        }
                    },
                    unit_amount: pricewithDiscount(item.productId.price, item.productId.discount) * 100
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: item.quantity
            }
        })

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            customer_email: user.email,
            metadata: {
                userId: userId,
                addressId: addressId
            },
            line_items: line_items,
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        }

        console.log('Creating Stripe session with params:', JSON.stringify(params, null, 2))
        
        const session = await Stripe.checkout.sessions.create(params)
        
        console.log('Stripe session created successfully:', session.id)
        
        return response.status(200).json(session)

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const getOrderProductItems = async ({
    lineItems,
    userId,
    addressId,
    paymentId,
    payment_status,
}) => {
    const productList = []

    if (lineItems?.data?.length) {
        for (const item of lineItems.data) {
            const product = await Stripe.products.retrieve(item.price.product)

            const paylod = {
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: product.metadata.productId,
                product_details: {
                    name: product.name,
                    image: product.images
                },
                paymentId: paymentId,
                payment_status: payment_status,
                delivery_address: addressId,
                subTotalAmt: Number(item.amount_total / 100),
                totalAmt: Number(item.amount_total / 100),
            }

            productList.push(paylod)
        }
    }

    return productList
}

//http://localhost:8080/api/order/webhook
export async function webhookStripe(request, response) {
    const event = request.body;
    const endPointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY

    console.log("event", event)

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const lineItems = await Stripe.checkout.sessions.listLineItems(session.id)
            const userId = session.metadata.userId
            const orderProduct = await getOrderProductItems(
                {
                    lineItems: lineItems,
                    userId: userId,
                    addressId: session.metadata.addressId,
                    paymentId: session.payment_intent,
                    payment_status: session.payment_status,
                })

            const order = await OrderModel.insertMany(orderProduct)

            console.log(order)
            if (Boolean(order[0])) {
                // Update product stock
                for (const item of lineItems.data) {
                    const product = await Stripe.products.retrieve(item.price.product)
                    await ProductModel.updateOne(
                        { _id: product.metadata.productId },
                        { $inc: { stock: -item.quantity } }
                    )
                }

                // Send order confirmation email
                try {
                    const user = await UserModel.findById(userId)
                    const orderAddress = await AddressModel.findById(session.metadata.addressId)
                    
                    console.log('Webhook email attempt - User:', user?.email, 'Address:', orderAddress?._id)
                    
                    if (user && orderAddress) {
                        const emailHtml = orderConfirmationTemplate({
                            userName: user.name,
                            orderId: order[0].orderId,
                            totalAmount: session.amount_total / 100,
                            address: orderAddress
                        })
                        
                        await sendEmail({
                            sendTo: user.email,
                            subject: "Order Confirmation - FreshOra",
                            html: emailHtml
                        })
                        console.log('Webhook email sent successfully to:', user.email)
                    }
                } catch (emailError) {
                    console.error('Webhook email sending failed:', emailError)
                }

                const removeCartItems = await UserModel.findByIdAndUpdate(userId, {
                    shopping_cart: []
                })
                const removeCartProductDB = await CartProductModel.deleteMany({ userId: userId })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
}

export async function getOrderDetailsController(request, response) {
    try {
        const userId = request.userId // order id

        const orderlist = await OrderModel.find({ userId: userId }).sort({ createdAt: -1 }).populate('delivery_address')

        return response.json({
            message: "order list",
            data: orderlist,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}