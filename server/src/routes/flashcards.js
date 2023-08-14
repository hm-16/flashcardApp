const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');
const checkAuth = require('../middleware/check-auth');
// Fetch user-specific flashcards
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming userId is included in the JWT payload
    const userFlashcards = await Flashcard.find({ user: userId });
    res.json(userFlashcards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new flashcard
router.post('/', async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming userId is included in the JWT payload
    const { topic, subtopic, description } = req.body;
    const flashcard = new Flashcard({ user: userId, topic, subtopic, description });
    await flashcard.save();
    res.status(201).json({ message: 'Flashcard created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Edit the flashcard
router.put('/:flashcardId', checkAuth, async (req, res) => {
    try {
      const flashcardId = req.params.flashcardId;
      const userId = req.user.userId;
  
      const { topic, subtopic, description } = req.body;
      const flashcard = await Flashcard.findOne({ _id: flashcardId, user: userId });
  
      if (!flashcard) {
        return res.status(404).json({ message: 'Flashcard not found' });
      }
  
      flashcard.topic = topic;
      flashcard.subtopic = subtopic;
      flashcard.description = description;
      await flashcard.save();
  
      res.json({ message: 'Flashcard updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//Delete the flashcard
router.delete('/:flashcardId', checkAuth, async (req, res) => {
    try {
      const flashcardId = req.params.flashcardId;
      const userId = req.user.userId;
  
      const flashcard = await Flashcard.findOne({ _id: flashcardId, user: userId });
  
      if (!flashcard) {
        return res.status(404).json({ message: 'Flashcard not found' });
      }
  
      await flashcard.remove();
  
      res.json({ message: 'Flashcard deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});



module.exports = router;
