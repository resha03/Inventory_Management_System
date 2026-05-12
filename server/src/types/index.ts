export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt?: string;
}

export interface DbUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  created_at?: string;
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  price: number;
  imageUrl?: string;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DbProduct {
  id?: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  price: number;
  image_url?: string;
  created_by: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthRequest extends Express.Request {
  user?: {
    uid: string;
    email: string;
    role: string;
  };
}

// Extend Express Request globally
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string;
        role: string;
      };
    }
  }
}
