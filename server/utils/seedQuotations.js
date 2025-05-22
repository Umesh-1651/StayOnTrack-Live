
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quotation = require('../models/Quotation');

// Initialize environment variables
dotenv.config();

// Sample quotation data
const quotations = [
  {
    content: "The best way to predict the future is to create it.",
    author: "Abraham Lincoln",
    genre: "motivational",
    tags: ["future", "creation", "inspiration"],
    source: "Speech"
  },
  {
    content: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    genre: "motivational",
    tags: ["time", "life", "authenticity"],
    source: "Stanford Commencement Address, 2005"
  },
  {
    content: "The quieter you become, the more you can hear.",
    author: "Ram Dass",
    genre: "spiritual",
    tags: ["silence", "awareness", "mindfulness"],
    source: "Be Here Now"
  },
  {
    content: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford",
    genre: "self-belief",
    tags: ["mindset", "belief", "attitude"],
    source: "Interview"
  },
  {
    content: "Love is not about possession. Love is about appreciation.",
    author: "Osho",
    genre: "love-life",
    tags: ["love", "appreciation", "relationships"],
    source: "Teachings"
  },
  {
    content: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    genre: "wisdom",
    tags: ["knowledge", "humility", "philosophy"],
    source: "Ancient writings"
  },
  {
    content: "Clean code always looks like it was written by someone who cares.",
    author: "Robert C. Martin",
    genre: "developer-tips",
    tags: ["clean-code", "programming", "craftsmanship"],
    source: "Clean Code"
  },
  {
    content: "When in doubt, use binary search.",
    author: "Anonymous",
    genre: "dsa-tips",
    tags: ["algorithms", "optimization", "problem-solving"],
    source: "Programming community"
  },
  {
    content: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    genre: "random",
    tags: ["life", "planning", "surprise"],
    source: "Song 'Beautiful Boy'"
  }
];

// Connect to MongoDB
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing quotations
    await Quotation.deleteMany({});
    console.log('Cleared existing quotations');
    
    // Insert sample quotations
    await Quotation.insertMany(quotations);
    console.log('Successfully seeded quotations collection');
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
