const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { getHederaClient } = require('../config/hedera');
const { AccountBalanceQuery, AccountId } = require('@hashgraph/sdk');

const router = express.Router();

// POST /api/wallet/connect - Connect wallet
router.post('/connect', [
  body('walletAddress').isString().isLength({ min: 1 }).withMessage('Wallet address is required'),
  body('name').optional().isString().withMessage('Name must be a string'),
  body('email').optional().isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { walletAddress, name, email } = req.body;

    // Check if user already exists
    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });

    if (user) {
      // Update existing user
      if (name) user.name = name;
      if (email) user.email = email;
      await user.save();
    } else {
      // Create new user
      user = new User({
        walletAddress: walletAddress.toLowerCase(),
        name,
        email,
        role: 'attendee' // Default role
      });
      await user.save();
    }

    res.json({
      user,
      message: 'Wallet connected successfully'
    });
  } catch (error) {
    console.error('Error connecting wallet:', error);
    res.status(500).json({ error: 'Failed to connect wallet' });
  }
});

// GET /api/wallet/balance/:walletAddress - Get wallet balance
router.get('/balance/:walletAddress', async (req, res) => {
  try {
    const client = getHederaClient();
    const accountId = AccountId.fromString(req.params.walletAddress);

    const balanceQuery = new AccountBalanceQuery()
      .setAccountId(accountId);

    const balance = await balanceQuery.execute(client);

    res.json({
      walletAddress: req.params.walletAddress,
      balance: balance.hbars.toString(),
      tokens: balance.tokens.toString()
    });
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    res.status(500).json({ error: 'Failed to fetch wallet balance' });
  }
});

// POST /api/wallet/verify - Verify wallet ownership (simplified)
router.post('/verify', [
  body('walletAddress').isString().isLength({ min: 1 }).withMessage('Wallet address is required'),
  body('signature').isString().isLength({ min: 1 }).withMessage('Signature is required'),
  body('message').isString().isLength({ min: 1 }).withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { walletAddress, signature, message } = req.body;

    
    const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });

    if (!user) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    // Simplified verification - in production, use proper signature verification
    const isValid = signature && message; // Placeholder

    if (isValid) {
      res.json({
        verified: true,
        user,
        message: 'Wallet ownership verified'
      });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error verifying wallet:', error);
    res.status(500).json({ error: 'Failed to verify wallet' });
  }
});

module.exports = router;
