const pool = require('../db');
const { validationResult } = require('express-validator');

exports.getProducts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { categoryId } = req.query;
  try {
    let query = 'SELECT * FROM products';
    let params = [];
    if (categoryId) {
      query += ' WHERE category_id = $1';
      params.push(categoryId);
    }
    const products = await pool.query(query, params);
    res.json(products.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
    if (product.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, description, price, categoryId } = req.body;
  try {
    const product = await pool.query(
      'INSERT INTO products (name, description, price, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, categoryId]
    );
    res.status(201).json(product.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { productId } = req.params;
  const { name, description, price, categoryId } = req.body;
  try {
    const product = await pool.query(
      'UPDATE products SET name = COALESCE($1, name), description = COALESCE($2, description), price = COALESCE($3, price), category_id = COALESCE($4, category_id) WHERE id = $5 RETURNING *',
      [name, description, price, categoryId, productId]
    );
    if (product.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [productId]);
    if (product.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};