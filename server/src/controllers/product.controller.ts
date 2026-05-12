import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { DbProduct, Product } from '../types';

const normalizeProduct = (row: DbProduct): Product => ({
  id: row.id,
  name: row.name,
  description: row.description,
  category: row.category,
  quantity: row.quantity,
  price: row.price,
  imageUrl: row.image_url || '',
  createdBy: row.created_by,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// GET /api/products  — list with search, filter, pagination
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const searchText = typeof search === 'string' ? search.trim() : '';

    let query = supabase.from('products').select('*', { count: 'exact' });

    if (category && category !== '') {
      query = query.eq('category', category as string);
    }

    if (searchText) {
      const safeSearch = searchText.replace(/'/g, "''");
      query = query.or(`name.ilike.%${safeSearch}%,description.ilike.%${safeSearch}%`);
    }

    query = query.order('created_at', { ascending: false });
    query = query.range((pageNum - 1) * limitNum, pageNum * limitNum - 1);

    const { data, count, error } = await query;
    if (error) throw error;

    const products = (data || []).map(normalizeProduct);
    const total = count ?? products.length;

    res.json({
      data: products,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// GET /api/products/:id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(normalizeProduct(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

// POST /api/products
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, category, quantity, price } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : '';

    const { data, error } = await supabase
      .from('products')
      .insert({
        name,
        description,
        category,
        quantity: Number(quantity),
        price: Number(price),
        image_url,
        created_by: req.user!.uid,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select('*')
      .single();

    if (error || !data) {
      throw error || new Error('Failed to create product');
    }

    res.status(201).json({ message: 'Product created', ...normalizeProduct(data) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: existing, error: existingError } = await supabase
      .from('products')
      .select('id')
      .eq('id', req.params.id)
      .single();

    if (existingError || !existing) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const { name, description, category, quantity, price } = req.body;
    const updates: any = {
      updated_at: new Date().toISOString(),
    };

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (category !== undefined) updates.category = category;
    if (quantity !== undefined) updates.quantity = Number(quantity);
    if (price !== undefined) updates.price = Number(price);
    if (req.file) updates.image_url = `/uploads/${req.file.filename}`;

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', req.params.id)
      .select('*')
      .single();

    if (error || !data) {
      throw error || new Error('Failed to update product');
    }

    res.json({ message: 'Product updated', ...normalizeProduct(data) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

// GET /api/products/categories  — unique categories list
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase.from('products').select('category');
    if (error) throw error;

    const categories = [...new Set((data || []).map((item) => item.category).filter(Boolean))];
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};
