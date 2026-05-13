Inventory Management System

A robust, web-based Inventory Management System designed to streamline stock tracking, user management, and transaction logging.


Live Links
    Frontend: https://inventory-management-system-alpha-blond.vercel.app
    Backend API: https://inventory-management-system-tbcu.onrender.com

Tech Stack
Frontend
Angular – Modern web framework for building scalable apps.
Tailwind CSS – Utility-first CSS framework for rapid UI development.
TypeScript – Type-safe JavaScript for better maintainability.

Backend
Node.js – JavaScript runtime for server-side logic.
Express.js – Minimalist web application framework.
TypeScript – Type-safe JavaScript for robust API development.

Database & Authentication
Supabase – Scalable PostgreSQL database and backend-as-a-service.
JWT Auth – Custom JSON Web Token implementation for secure sessions.

Setup Instructions
Prerequisites
    Node.js (v18 or higher)
    npm or yarn

Frontend Setup
Bash
    cd client
    npm install
    npm start
Backend Setup
Bash
    cd server
    npm install
    npm run dev
API Overview
Authentication Endpoints
POST /api/auth/register - User registration
POST /api/auth/login - User login

Product Endpoints
GET /api/products - Get all products (with pagination, search, category filter)
GET /api/products/:id - Get single product details
POST /api/products - Create new product (Admin only)
PUT /api/products/:id - Update product information
DELETE /api/products/:id - Remove product from inventory
GET /api/products/categories - Get all existing categories

Health Check
GET /api/health - API health status

Features Implemented
User Authentication
    User registration and secure login with JWT tokens.
    Role-Based Access (RBAC): Distinct permissions for Admin and Staff roles.

Dashboard
    High-level overview of total products and stock health.
    Low Stock Alerts: Visual indicators for items requiring restock.
    Category-based statistics and recent activity logs.

Product Management
    Full CRUD operations (Create, Read, Update, Delete) for inventory items.
    Advanced search, category filtering, and pagination.
    Real-time stock level tracking and transaction history.

Responsive Design
    Mobile-friendly interface built with Tailwind CSS.
    Clean, modern UI/UX designed for both desktop and mobile devices.

Database
Supabase is used. Configure your Supabase project and add the credentials to server/.env. We use the users and products tables for the backend API.