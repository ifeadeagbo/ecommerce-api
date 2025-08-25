const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticate = require('../middleware/authenticate');
const { body } = require('express-validator');

router.post('/', authenticate, cartController.createCart);
router.post(
  '/:cartId',
  authenticate,
  [
    body('productId').isInt(),
    body('quantity').isInt({ min: 1 })
  ],
  cartController.addItemToCart
);
router.get('/:cartId', authenticate, cartController.getCart);
router.post('/:cartId/checkout', authenticate, cartController.checkout);

module.exports = router;