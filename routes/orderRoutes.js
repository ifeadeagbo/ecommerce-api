const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, orderController.getOrders);
router.get('/:orderId', authenticate, orderController.getOrderById);

module.exports = router;