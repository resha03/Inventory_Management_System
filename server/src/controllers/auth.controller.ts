import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase';
import { DbUser, User } from '../types';

const getValidationErrorMessage = (req: Request): string | null => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errors.array()[0].msg;
  }
  return null;
};

// POST /api/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validationError = getValidationErrorMessage(req);
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    const { name, email, password, role = 'user' } = req.body;

    const { data: existingUsers, error: existingError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (existingError) {
      throw existingError;
    }

    if (existingUsers?.length) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const roleValue = role === 'admin' ? 'admin' : 'user';

    const { data: newUserData, error: insertError } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password: hashedPassword,
        role: roleValue,
        created_at: new Date().toISOString(),
      })
      .select('id,name,email,role')
      .single();

    if (insertError || !newUserData) {
      throw insertError || new Error('Failed to create user');
    }

    const token = jwt.sign(
      { uid: newUserData.id, email, role: newUserData.role },
      process.env.JWT_SECRET ?? 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' } as unknown as jwt.SignOptions
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUserData.id, name: newUserData.name, email: newUserData.email, role: newUserData.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validationError = getValidationErrorMessage(req);
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    const { email, password } = req.body;

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1);

    if (error) {
      throw error;
    }

    if (!users || users.length === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const userData = users[0];
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { uid: userData.id, email: userData.email, role: userData.role },
      process.env.JWT_SECRET ?? 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' } as unknown as jwt.SignOptions
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// GET /api/auth/me
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id,name,email,role')
      .eq('id', req.user!.uid)
      .single();

    if (error || !data) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
