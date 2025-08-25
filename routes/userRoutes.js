const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const authenticate = require('../middleware/authenticate');
const passport = require('passport');

router.post(
  '/register',
  [
    body('username').isLength({ min: 3 }).trim().escape(),
    body('password').isLength({ min: 6 }),
    body('email').isEmail().normalizeEmail()
  ],
  userController.register
);
router.post(
  '/login',
  [
    body('username').notEmpty().trim().escape(),
    body('password').notEmpty()
  ],
  passport.authenticate('local', { session: false }),
  userController.login
);
router.get('/', authenticate, userController.getUsers);
router.get('/:userId', authenticate, userController.getUserById);
router.put(
  '/:userId',
  authenticate,
  [
    body('username').optional().isLength({ min: 3 }).trim().escape(),
    body('email').optional().isEmail().normalizeEmail()
  ],
  userController.updateUser
);

module.exports = router;