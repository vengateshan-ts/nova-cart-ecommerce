const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        cartItems: [],
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      const populatedUser = await User.findById(user._id).populate('cartItems.product');
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        cartItems: populatedUser.cartItems || [],
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('cartItems.product');
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        cartItems: user.cartItems || [],
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Sync user cart
// @route   PUT /api/auth/cart
// @access  Private
const syncCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.cartItems = req.body.cartItems;
      await user.save();
      res.json({ message: 'Cart synced' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password (Simulation)
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      user.password = newPassword;
      await user.save();
      res.json({ message: 'Password reset successful (Simulation)' });
    } else {
      res.status(404);
      throw new Error('User with this email does not exist');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  syncCart,
  forgotPassword,
};
