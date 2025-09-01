const orderConfirmationTemplate = ({ userName, orderId, totalAmount, address }) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Order Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 20px; }
            .footer { background-color: #f8f8f8; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Order Confirmation</h1>
            </div>
            <div class="content">
                <h2>Thank you for your order, ${userName}!</h2>
                <p>Your order <strong>${orderId}</strong> with billing amount <strong>₹${totalAmount}</strong> has been successfully placed.</p>
                
                <h3>Delivery Address:</h3>
                <p>
                    ${address.address_line}<br>
                    ${address.city}, ${address.state}<br>
                    ${address.country} - ${address.pincode}<br>
                    Phone: ${address.mobile}
                </p>
                
                <p>We will process your order and notify you once it's shipped.</p>
            </div>
            <div class="footer">
                <p>Thank you for shopping with FreshOra!</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export default orderConfirmationTemplate;