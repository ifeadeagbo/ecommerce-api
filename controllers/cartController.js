const pool = require('../db');
const { validationResult } = require('express-validator');

exports.createCart = async (req, res) => {
  const userId = req.user.userId;
  try {
    const cart = await pool.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING *', [userId]);
    res.status(201).json(cart.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addItemToCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { cartId } = req.params;
  const { productId, quantity } = req.body;
  try {
    const cart = await pool.query('SELECT * FROM carts WHERE id = $1 AND user_id = $2', [cartId, req.user.userId]);
    if (cart.rows.length === 0) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
    if (product.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const cartItem = await pool.query(
      'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [cartId, productId, quantity]
    );
    res.status(201).json(cartItem.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await pool.query('SELECT * FROM carts WHERE id = $1 AND user_id = $2', [cartId, req.user.userId]);
    if (cart.rows.length === 0) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const items = await pool.query('SELECT ci.*, p.name, p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = $1', [cartId]);
    res.json({ cart: cart.rows[0], items: items.rows });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.checkout = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await pool.query('SELECT * FROM carts WHERE id = $1 AND user_id = $2', [cartId, req.user.userId]);
    if (cart.rows.length === 0) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const items = await pool.query('SELECT ci.*, p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = $1', [cartId]);
    if (items.rows.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    const totalAmount = items.rows.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await pool.query(
      'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *',
      [req.user.userId, totalAmount]
    );
    for (const item of items.rows) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES ($1, $2, $3, $4)',
        [order.rows[0].id, item.product_id, item.quantity, item.price]
      );
    }
    await pool.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
    res.json(order.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};