// routes/eventRoutes.js
const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const Event = require('../models/Event');

const router = express.Router();

// Admin-only: create a new event
router.post(
  '/create',
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const evt = await Event.create(req.body);
      res.status(201).json({ message: 'Event created!', event: evt });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// (Optional) Public: list all events
router.get(
  '/all',
  async (req, res) => {
    try {
      const events = await Event.find().sort({ date: 1 });
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// (Optional) Public: get a single event by ID
router.get(
  '/:id',
  async (req, res) => {
    try {
      const evt = await Event.findById(req.params.id);
      if (!evt) return res.status(404).json({ error: 'Event not found' });
      res.json(evt);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
