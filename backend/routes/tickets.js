const express = require('express');
const { body, validationResult } = require('express-validator');
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const User = require('../models/User');
const { getHederaClient } = require('../config/hedera');
const { TokenMintTransaction, TokenCreateTransaction, TokenType, TokenSupplyType } = require('@hashgraph/sdk');

const router = express.Router();

// GET /api/tickets/:userId - Get user's tickets
router.get('/:userId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ buyerId: req.params.userId })
      .populate('eventId', 'title date location')
      .sort({ purchaseDate: -1 });

    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// POST /api/tickets/purchase - Purchase ticket
router.post('/purchase', [
  body('eventId').isMongoId().withMessage('Valid event ID is required'),
  body('buyerId').isMongoId().withMessage('Valid buyer ID is required'),
  body('price').isNumeric().withMessage('Price must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { eventId, buyerId, price } = req.body;

    // Check if event exists and has available tickets
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.soldTickets >= event.maxTickets) {
      return res.status(400).json({ error: 'Event is sold out' });
    }

    // Check if buyer exists
    const buyer = await User.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ error: 'Buyer not found' });
    }

    // Mint NFT ticket on Hedera
    const client = getHederaClient();
    const tokenId = await mintTicketNFT(client, event, buyer);

    // Create ticket record
    const ticket = new Ticket({
      eventId,
      buyerId,
      tokenId: tokenId.toString(),
      serialNumber: event.soldTickets + 1,
      price,
      transactionHash: 'placeholder', // Will be updated with actual transaction hash
      metadata: {
        ticketType: 'standard'
      }
    });

    await ticket.save();

    // Update event sold tickets count
    event.soldTickets += 1;
    await event.save();

    // Add ticket to buyer's purchased tickets
    buyer.ticketsPurchased.push(ticket._id);
    await buyer.save();

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error purchasing ticket:', error);
    res.status(500).json({ error: 'Failed to purchase ticket' });
  }
});

// Helper function to mint NFT ticket
async function mintTicketNFT(client, event, buyer) {
  try {
    // Create NFT token for the event (if not exists)
    const tokenCreateTx = await new TokenCreateTransaction()
      .setTokenName(`${event.title} Ticket`)
      .setTokenSymbol('TKT')
      .setTokenType(TokenType.NonFungibleUnique)
      .setSupplyType(TokenSupplyType.Finite)
      .setInitialSupply(0)
      .setMaxSupply(event.maxTickets)
      .setTreasuryAccountId(client.operatorAccountId)
      .setAdminKey(client.operatorPublicKey)
      .setSupplyKey(client.operatorPublicKey)
      .setFreezeKey(client.operatorPublicKey)
      .setWipeKey(client.operatorPublicKey)
      .freezeWith(client)
      .sign(client.operatorPrivateKey);

    const tokenCreateSubmit = await tokenCreateTx.execute(client);
    const tokenCreateReceipt = await tokenCreateSubmit.getReceipt(client);
    const tokenId = tokenCreateReceipt.tokenId;

    // Mint NFT for the buyer
    const mintTx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([
        Buffer.from(JSON.stringify({
          eventId: event._id.toString(),
          buyerAddress: buyer.walletAddress,
          purchaseDate: new Date().toISOString()
        }))
      ])
      .freezeWith(client)
      .sign(client.operatorPrivateKey);

    const mintSubmit = await mintTx.execute(client);
    const mintReceipt = await mintSubmit.getReceipt(client);

    return tokenId;
  } catch (error) {
    console.error('Error minting NFT ticket:', error);
    throw error;
  }
}

module.exports = router;
