const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const Donation = require('../models/Donation');
const bcrypt = require('bcryptjs'); // For password hashing if needed, though wallet-based

const router = express.Router();

// GET /api/users/:id - Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('eventsOrganized', 'title date')
      .populate('ticketsPurchased', 'eventId price purchaseDate')
      .populate('donations', 'amount cause patientId createdAt');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Don't return sensitive data if needed
    const { walletAddress, name, email, role, totalDonated, createdAt, updatedAt, ...userProfile } = user.toObject();
    userProfile.walletAddress = walletAddress;
    userProfile.name = name;
    userProfile.email = email;
    userProfile.role = role;
    userProfile.totalDonated = totalDonated;
    userProfile.createdAt = createdAt;
    userProfile.updatedAt = updatedAt;

    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// PUT /api/users/:id - Update user profile
router.put('/:id', [
  body('name').optional().isString().withMessage('Name must be a string'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('role').optional().isIn(['attendee', 'organizer', 'donor']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if requester is the user themselves (wallet-based auth would handle this)
    if (user._id.toString() !== req.body.userId) {
      return res.status(403).json({ error: 'Unauthorized to update this profile' });
    }

    const updates = req.body;
    if (updates.name) user.name = updates.name;
    if (updates.email) user.email = updates.email;
    if (updates.role) user.role = updates.role;
    if (updates.profileImage) user.profileImage = updates.profileImage;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// GET /api/users/organizers - Get all organizers
router.get('/organizers', async (req, res) => {
  try {
    const organizers = await User.find({ role: 'organizer' })
      .select('name email walletAddress profileImage totalDonated')
      .sort({ createdAt: -1 });

    res.json(organizers);
  } catch (error) {
    console.error('Error fetching organizers:', error);
    res.status(500).json({ error: 'Failed to fetch organizers' });
  }
});

// GET /api/users/donors - Get top donors
router.get('/donors', async (req, res) => {
  try {
    const topDonors = await User.find({ role: 'donor' })
      .select('name walletAddress totalDonated profileImage')
      .sort({ totalDonated: -1 })
      .limit(10);

    res.json(topDonors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
});

// POST /api/users - Create new user (wallet-based registration)
router.post('/', [
  body('walletAddress').isString().isLength({ min: 1 }).withMessage('Wallet address is required'),
  body('name').optional().isString().withMessage('Name must be a string'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('role').optional().isIn(['attendee', 'organizer', 'donor']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { walletAddress, name, email, role = 'attendee' } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this wallet address already exists' });
    }

    const user = new User({
      walletAddress: walletAddress.toLowerCase(),
      name,
      email,
      role
    });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// POST /api/users/:id/promote - Promote user to organizer (admin only)
router.post('/:id/promote', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.role = 'organizer';
    await user.save();

    res.json({ message: 'User promoted to organizer', user });
  } catch (error) {
    console.error('Error promoting user:', error);
    res.status(500).json({ error: 'Failed to promote user' });
  }
});

module.exports = router;
