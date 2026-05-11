*Inventory Management System*

A web-based Inventory Management System developed by Reysha03.

 **Programming Tools & Technologies**
- **Frontend:** React.js + Vite
- **Backend:** Node.js + Express
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Hosting:** Vercel (Frontend) + Render (Backend)

-User Roles

Admin
- Can add, update, and delete products/items
- Can manage stock levels and inventory
- Can view all transactions and reports
- Can manage registered users
- Can change own password
- Default username: **ADMIN** | Default password: **ADMIN**

Staff / User
- Can sign up and set their own username and password
- Can view current inventory and stock levels
- Can process stock in and stock out transactions
- Can view transaction history

Features
- Real-time inventory tracking
- Low stock notifications
- Transaction history and logs
- User authentication and role management
- Dashboard with inventory overview

Requirements
- Node.js v18+
- Firebase account
- npm or yarn

Setup
1. Clone the repository
2. Run `npm install` inside the `client` folder
3. Add your `.env` file with Firebase config
4. Run `npm run dev` to start locally

Database
Firebase Firestore is used. Configure your Firebase project and 
add the credentials to your `.env` file.
