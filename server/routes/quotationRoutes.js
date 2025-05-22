
const express = require('express');
const router = express.Router();
const Quotation = require('../models/Quotation');

// Get all quotations
router.get('/', async (req, res) => {
  try {
    const quotations = await Quotation.find({});
    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get quotations by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const quotations = await Quotation.find({ genre: req.params.genre });
    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a new quotation
router.post('/', async (req, res) => {
  try {
    const { content, author, genre, tags, source } = req.body;
    
    const newQuotation = new Quotation({
      content,
      author,
      genre,
      tags,
      source
    });
    
    await newQuotation.save();
    res.status(201).json({ message: 'Quotation added successfully', quotation: newQuotation });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a quotation
router.put('/:id', async (req, res) => {
  try {
    const { content, author, genre, tags, source } = req.body;
    
    const updatedQuotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      {
        content,
        author,
        genre,
        tags,
        source
      },
      { new: true }
    );
    
    if (!updatedQuotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }
    
    res.status(200).json({ message: 'Quotation updated successfully', quotation: updatedQuotation });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a quotation
router.delete('/:id', async (req, res) => {
  try {
    const deletedQuotation = await Quotation.findByIdAndDelete(req.params.id);
    
    if (!deletedQuotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }
    
    res.status(200).json({ message: 'Quotation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get random quotation by genre
router.get('/random/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    
    // If genre is 'random', get a random quote from any genre
    const query = genre === 'random' ? {} : { genre };
    
    const count = await Quotation.countDocuments(query);
    
    if (count === 0) {
      return res.status(404).json({ message: 'No quotations found for this genre' });
    }
    
    const random = Math.floor(Math.random() * count);
    const randomQuotation = await Quotation.findOne(query).skip(random);
    
    res.status(200).json(randomQuotation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
