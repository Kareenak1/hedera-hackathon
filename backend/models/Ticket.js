const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tokenId: {
    type: String,
    required: true
  },
  serialNumber: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'used', 'transferred', 'cancelled'],
    default: 'active'
  },
  metadata: {
    seatNumber: String,
    ticketType: {
      type: String,
      enum: ['standard', 'vip', 'premium'],
      default: 'standard'
    },
    qrCode: String
  },
  transactionHash: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
ticketSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
ticketSchema.index({ eventId: 1 });
ticketSchema.index({ buyerId: 1 });
ticketSchema.index({ tokenId: 1 }, { unique: true });

module.exports = mongoose.model('Ticket', ticketSchema);
