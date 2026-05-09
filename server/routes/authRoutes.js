const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  authUser, 
  getUserProfile, 
  syncCart, 
  forgotPassword 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.put('/cart', protect, syncCart);
router.post('/forgot-password', forgotPassword);

module.exports = router;
