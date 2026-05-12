
*Inventory Management System*

A web-based Inventory Management System developed by Sorsano, Aquilisca and Delos Reyes

 **Programming Tools & Technologies**

# Inventory Management System

A web-based Inventory Management System developed by Reysha03.

## Programming Tools & Technologies

- **Frontend:** Angular
- **Backend:** Node.js + Express
- **Database:** Supabase
- **Authentication:** Custom JWT auth via backend
- **Hosting:** Vercel (Frontend) + Render (Backend)



## User Roles

### Admin

- Can add, update, and delete products/items
- Can manage stock levels and inventory
- Can view all transactions and reports
- Can manage registered users
- Can change own password
- Default username: **ADMIN** | Default password: **ADMIN**



### Staff / User
- Can sign up and set their own username and password
- Can view current inventory and stock levels
- Can process stock in and stock out transactions
- Can view transaction history


## Features

- Real-time inventory tracking
- Low stock notifications
- Transaction history and logs
- User authentication and role management
- Dashboard with inventory overview


## Requirements

- Node.js v18+
- Supabase account
- npm or yarn


## Setup

1. Clone the repository
2. Run `npm install` inside the `client` folder
3. Add your `server/.env` file with Supabase config
4. Run `npm run dev` in the `server` folder to start the backend locally


## Database
Supabase is used. Configure your Supabase project and add the credentials to `server/.env`. We use the `users` and `products` tables for the backend API.
