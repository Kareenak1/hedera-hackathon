const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ticketPrice: {
    type: Number,
    default: 0,
    min: 0
  },
  maxTickets: {
    type: Number,
    default: 100,
    min: 1
  },
  soldTickets: {
    type: Number,
    default: 0,
    min: 0
  },
  cause: {
    type: String,
    enum: ['Health', 'Education', 'Environment', 'Community'],
    default: 'Health'
  },
  impactArea: {
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
eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', eventSchema);
