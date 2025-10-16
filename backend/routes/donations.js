const express = require('express');
const { body, validationResult } = require('express-validator');
const Donation = require('../models/Donation');
const User = require('../models/User');
const { getHederaClient } = require('../config/hedera');
const { TransferTransaction, Hbar } = require('@hashgraph/sdk');

const router = express.Router();

// GET /api/donations - Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donorId', 'name walletAddress')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// GET /api/donations/:patientId - Get donations for a specific patient
router.get('/:patientId', async (req, res) => {
  try {
    const donations = await Donation.find({ patientId: req.params.patientId })
      .populate('donorId', 'name walletAddress')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// POST /api/donations - Create donation
router.post('/', [
  body('donorId').isMongoId().withMessage('Valid donor ID is required'),
  body('patientId').isString().isLength({ min: 1 }).withMessage('Patient ID is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('cause').optional().isIn(['Health', 'Education', 'Environment', 'Community']).withMessage('Invalid cause')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { donorId, patientId, amount, cause, impactArea } = req.body;

    // Check if donor exists
    const donor = await User.findById(donorId);
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    // Process donation on Hedera
    const client = getHederaClient();
    const transactionHash = await processDonation(client, donor, amount);

    // Create donation record
    const donation = new Donation({
      donorId,
      patientId,
      amount,
      cause: cause || 'Health',
      impactArea,
      transactionHash
    });

    await donation.save();

    // Update donor's total donated amount
    donor.totalDonated += amount;
    await donor.save();

    res.status(201).json(donation);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ error: 'Failed to create donation' });
  }
});

// PUT /api/donations/:id/verify - Verify donation impact
router.put('/:id/verify', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    donation.verified = true;
    donation.verificationDate = new Date();
    donation.impact = req.body.impact; // Impact data from request

    await donation.save();

    res.json(donation);
  } catch (error) {
    console.error('Error verifying donation:', error);
    res.status(500).json({ error: 'Failed to verify donation' });
  }
});

// Helper function to process donation on Hedera
async function processDonation(client, donor, amount) {
  try {
    // This is a simplified example - in production, you'd handle wallet connections properly
    // For now, we'll simulate a transaction
    const transaction = await new TransferTransaction()
      .addHbarTransfer(client.operatorAccountId, new Hbar(-amount))
      .addHbarTransfer('0.0.123456', new Hbar(amount)) // Replace with actual recipient account
      .freezeWith(client)
      .sign(client.operatorPrivateKey);

    const submitTransaction = await transaction.execute(client);
    const receipt = await submitTransaction.getReceipt(client);

    return receipt.transactionId.toString();
  } catch (error) {
    console.error('Error processing donation:', error);
    throw error;
  }
}

module.exports = router;
