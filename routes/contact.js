const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // get model here
const authMiddleware = require('../middleware/auth'); // protect GET route

// POST contact form message (public, no auth)
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all fields' });
    }

    // Create and save new contact message
    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(201).json({ success: true, message: 'Message received!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all contact form messages (protected)
router.get('/messages', authMiddleware, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;