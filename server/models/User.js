
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  quoteGenre: {
    type: String,
    enum: ['motivational', 'spiritual', 'self-belief', 'love-life', 'wisdom', 'developer-tips', 'dsa-tips', 'random'],
    default: 'motivational'
  },
  deliveryTime: {
    type: String,
    default: '8:00 AM'
  },
  isRandomTime: {
    type: Boolean,
    default: false
  },
  isRandomGenre: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
