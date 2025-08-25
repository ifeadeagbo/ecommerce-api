const pool = require('../db');

exports.getOrders = async (req, res) => {
  try {
    const orders = await pool.query('SELECT * FROM orders WHERE user_id = $1', [req.user.userId]);
    res.json(orders.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await pool.query('SELECT * FROM orders WHERE id = $1 AND user_id = $2', [orderId, req.user.userId]);
    if (order.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const items = await pool.query('SELECT oi.*, p.name FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = $1', [orderId]);
    res.json({ order: order.rows[0], items: items.rows });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};