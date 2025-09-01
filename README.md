# 🛒 FreshOra - Online Grocery Store

A full-stack e-commerce web application for online grocery shopping built with React.js and Node.js. FreshOra provides a seamless shopping experience with features like user authentication, product management, shopping cart, order processing, and payment integration.

## 🌟 Features

### User Features
- **User Authentication**: Register, login, email verification, and password reset
- **Product Browsing**: Browse products by categories and subcategories
- **Search & Filter**: Advanced search functionality with filters
- **Shopping Cart**: Add/remove items, quantity management
- **Order Management**: Place orders, track order history
- **Address Management**: Multiple delivery addresses
- **Payment Integration**: Secure payment processing with Stripe
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Product Management**: Add, edit, delete products
- **Category Management**: Manage product categories and subcategories
- **Order Management**: View and process customer orders
- **User Management**: Admin dashboard for user oversight
- **Image Upload**: Cloudinary integration for product images

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and development server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **Stripe.js** - Payment processing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage
- **Stripe** - Payment processing
- **Nodemailer/Resend** - Email services
- **Multer** - File upload handling

## 📁 Project Structure

```
FreshOra/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── utils/         # Utility functions
│   │   ├── hooks/         # Custom React hooks
│   │   ├── layouts/       # Layout components
│   │   └── assets/        # Images and static files
│   └── package.json
├── server/                # Backend Node.js application
│   ├── config/           # Database and service configurations
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   └── package.json
└── Freshora_images/     # Product and category images
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/FreshOra.git
   cd FreshOra
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

1. **Server Environment Variables**
   Create a `.env` file in the `server` directory:
   ```env
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   FRONTEND_URL=http://localhost:5173
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Stripe Configuration
   STRIPE_SECRET_KEY=your_stripe_secret_key
   
   # Email Configuration (Resend)
   RESEND_API_KEY=your_resend_api_key
   ```

2. **Client Environment Variables**
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:8080
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:8080`

2. **Start the frontend application**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

## 📱 Usage

1. **User Registration**: Create a new account with email verification
2. **Browse Products**: Explore different categories and products
3. **Add to Cart**: Select products and add them to your shopping cart
4. **Checkout**: Proceed to checkout with address and payment details
5. **Order Tracking**: Track your orders in the user dashboard

### Admin Access
- Access admin features through the admin dashboard
- Manage products, categories, and orders
- View analytics and user management

## 🔧 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout
- `POST /api/user/forgot-password` - Password reset request
- `POST /api/user/verify-email` - Email verification

### Products
- `GET /api/product` - Get all products
- `POST /api/product` - Create product (Admin)
- `PUT /api/product/:id` - Update product (Admin)
- `DELETE /api/product/:id` - Delete product (Admin)

### Categories
- `GET /api/category` - Get all categories
- `POST /api/category` - Create category (Admin)
- `PUT /api/category/:id` - Update category (Admin)
- `DELETE /api/category/:id` - Delete category (Admin)

### Cart & Orders
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart
- `POST /api/order` - Create order
- `GET /api/order` - Get user orders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB for the robust database solution
- Stripe for secure payment processing
- Cloudinary for image management
- All contributors and testers

## 📞 Support

For support, email your-email@example.com or create an issue in this repository.

---

**Happy Shopping with FreshOra! 🛒✨**