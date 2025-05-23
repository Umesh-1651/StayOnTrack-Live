const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');

// Create a new user (sign up)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, quoteGenre, deliveryTime, isRandomTime, isRandomGenre } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Create new user
    const newUser = new User({
      name,
      email,
      quoteGenre,
      deliveryTime,
      isRandomTime,
      isRandomGenre
    });
    
    await newUser.save();

    // Send welcome email
    try {
      await sendEmail(
        email,
        "Welcome to StayOnTrack!",
        `Hi ${name},\n\nWelcome to StayOnTrack! You're all set to receive daily quotes that will inspire and motivate you.\n\nBest regards,\nThe StayOnTrack Team`
      );
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Continue with user creation even if email fails
    }

    res.status(201).json({ message: 'User created successfully', userId: newUser._id });
    
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user by email
router.get('/by-email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
const otpStore = {}; // Simple in-memory store

// 📩 Send OTP to user
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    await sendEmail(
      email,
      'Your StayOnTrack OTP',
      `Hi ${user.name},\n\nYour OTP is: ${otp}\n\nThis is valid for 5 minutes.\n\n-StayOnTrack`
    );

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// ✅ Verify OTP and delete user
router.post('/verify-unsubscribe', async (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email] || otpStore[email] !== otp) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  try {
    const deleted = await User.findOneAndDelete({ email });
    if (!deleted) {
      return res.status(404).json({ message: 'User not found or already deleted' });
    }

    delete otpStore[email];
    res.status(200).json({ message: 'User unsubscribed and deleted successfully' });
  } catch (err) {
    console.error('Error during unsubscription:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

// Unsubscribe (deactivate) a user
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.isActive = false;
    await user.save();
    
    res.status(200).json({ message: 'User unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user preferences
router.put('/update-preferences', async (req, res) => {
  try {
    const { email, quoteGenre, deliveryTime, isRandomTime, isRandomGenre } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user preferences
    user.quoteGenre = quoteGenre || user.quoteGenre;
    user.deliveryTime = deliveryTime || user.deliveryTime;
    user.isRandomTime = isRandomTime !== undefined ? isRandomTime : user.isRandomTime;
    user.isRandomGenre = isRandomGenre !== undefined ? isRandomGenre : user.isRandomGenre;
    
    await user.save();
    
    res.status(200).json({ message: 'Preferences updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
