🚀 Live Links
Frontend: [https://inventory-system-mu-khaki.vercel.app]
Backend API: [https://inventory-system-1-mopu.onrender.com/api]
🛠 Tech Stack
Frontend
Angular 21 - Modern web framework
Tailwind CSS - Utility-first CSS framework
TypeScript - Type-safe JavaScript
Backend
Node.js - JavaScript runtime
Express.js - Web application framework
TypeScript - Type-safe JavaScript
Database
Firebase Firestore - NoSQL cloud database
📋 Setup Instructions
Prerequisites
Node.js (v18 or higher)
npm or yarn
Frontend Setup
cd client
npm install
npm start
Backend Setup
cd server
npm install
npm run dev
📡 API Overview
Authentication Endpoints
POST /api/auth/register - User registration
POST /api/auth/login - User login
Product Endpoints
GET /api/products - Get all products (with pagination, search, category filter)
GET /api/products/:id - Get single product
POST /api/products - Create new product
PUT /api/products/:id - Update product
DELETE /api/products/:id - Delete product
GET /api/products/categories - Get all categories
Health Check
GET /api/health - API health status
✨ Features Implemented
User Authentication

User registration with email/password
Secure login with JWT tokens
Role-based access (admin/user)
Dashboard

Overview of total products
Low stock alerts
Recent products display
Category statistics
Product Management

Add new products with image upload
Edit existing products
Delete products
View product details
Search and filter by category
Pagination for large product lists
Image Upload

Firebase Storage integration
Image preview and validation
Automatic image serving
Responsive Design

Mobile-friendly interface
Tailwind CSS styling
Modern UI components
