
const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    enum: ['motivational', 'spiritual', 'self-belief', 'love-life', 'wisdom', 'developer-tips', 'dsa-tips', 'random'],
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  source: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;
