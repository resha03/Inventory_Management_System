# Inventory System

Inventory System is a full-stack application for managing products, authentication, and file uploads.

## Project structure

- `client/` - Angular frontend application
- `server/` - Express.js backend API using TypeScript and Supabase
- `uploads/` - persisted uploaded product files/photos
- `sql.txt` - optional SQL or data model references

## Features

- User registration and login with JWT authentication
- Product CRUD operations
- File upload support for products
- Supabase-backed data storage
- Swagger API documentation

## Technology stack

- Frontend: Angular 21
- Backend: Express.js, TypeScript
- Database/API: Supabase
- Authentication: JSON Web Tokens (JWT)
- File upload: Multer
- API docs: Swagger UI

## Prerequisites

- Node.js (v18+ recommended)
- npm
- Supabase project with a valid URL and key

## Backend setup

1. Open terminal and navigate to `server/`
2. Install dependencies:

```bash
cd server
npm install
```

3. Create a `.env` file in `server/` with values similar to:

```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:4200
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

4. Start the backend in development mode:

```bash
npm run dev
```

5. Visit the API docs:

```text
http://localhost:3000/api/docs
```

## Frontend setup

1. Open terminal and navigate to `client/`
2. Install dependencies:

```bash
cd client
npm install
```

3. Start the Angular development server:

```bash
npm start
```

4. Open the frontend in your browser:

```text
http://localhost:4200
```

## Notes

- The backend creates the upload directory automatically if it does not exist.
- CORS allows `http://localhost:4200` plus configured `CLIENT_URL` and verified Vercel preview URLs.
- The backend expects Supabase configuration through environment variables.

## Useful commands

Frontend:

```bash
cd client
npm start
npm run build
```

Backend:

```bash
cd server
npm run dev
npm run build
npm start
```
