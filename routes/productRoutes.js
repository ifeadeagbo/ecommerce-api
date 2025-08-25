const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticate = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');
const { body, query } = require('express-validator');

router.get(
  '/',
  [query('categoryId').optional().isInt()],
  productController.getProducts
);
router.get('/:productId', productController.getProductById);
router.post(
  '/',
  authenticate,
  isAdmin,
  [
    body('name').isLength({ min: 1 }).trim().escape(),
    body('price').isFloat({ min: 0 }),
    body('categoryId').isInt()
  ],
  productController.createProduct
);
router.put(
  '/:productId',
  authenticate,
  isAdmin,
  [
    body('name').optional().isLength({ min: 1 }).trim().escape(),
    body('price').optional().isFloat({ min: 0 }),
    body('categoryId').optional().isInt()
  ],
  productController.updateProduct
);
router.delete(
  '/:productId',
  authenticate,
  isAdmin,
  productController.deleteProduct
);

module.exports = router;