const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  originalPrice: {
    type: Number,
  },
  discount: {
    type: String,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  image: {
    type: String,
    required: [true, 'Please add an image'],
  },
  images: [String],
  brand: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: [true, 'Please add count in stock'],
    default: 0,
  },
  isHot: {
    type: Boolean,
    default: false,
  },
  isBestSeller: {
    type: Boolean,
    default: false,
  },
  deliveryDate: {
    type: String,
  },
  highlights: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
