const express = require('express');
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const User = require('../models/User');

const router = express.Router();

// GET /api/events - Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('organizerId', 'name walletAddress')
      .sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET /api/events/:id - Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizerId', 'name walletAddress');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// POST /api/events - Create new event (organizers only)
router.post('/', [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('location').trim().isLength({ min: 1 }).withMessage('Location is required'),
  body('organizerId').isMongoId().withMessage('Valid organizer ID is required'),
  body('ticketPrice').optional().isNumeric().withMessage('Ticket price must be a number'),
  body('maxTickets').optional().isNumeric().withMessage('Max tickets must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { organizerId, ...eventData } = req.body;

    // Verify organizer exists and has organizer role
    const organizer = await User.findById(organizerId);
    if (!organizer) {
      return res.status(404).json({ error: 'Organizer not found' });
    }

    if (organizer.role !== 'organizer') {
      return res.status(403).json({ error: 'Only organizers can create events' });
    }

    const event = new Event({
      ...eventData,
      organizerId
    });

    await event.save();

    // Add event to organizer's eventsOrganized array
    organizer.eventsOrganized.push(event._id);
    await organizer.save();

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// PUT /api/events/:id - Update event (organizer only)
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if requester is the organizer
    if (event.organizerId.toString() !== req.body.organizerId) {
      return res.status(403).json({ error: 'Only the organizer can update this event' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE /api/events/:id - Delete event (organizer only)
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if requester is the organizer
    if (event.organizerId.toString() !== req.body.organizerId) {
      return res.status(403).json({ error: 'Only the organizer can delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
