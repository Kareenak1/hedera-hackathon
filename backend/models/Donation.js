const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'HBAR'
  },
  cause: {
    type: String,
    enum: ['Health', 'Education', 'Environment', 'Community'],
    default: 'Health'
  },
  impactArea: {
    type: String
  },
  transactionHash: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'failed'],
    default: 'pending'
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationDate: {
    type: Date
  },
  impact: {
    description: String,
    metrics: mongoose.Schema.Types.Mixed,
    images: [String]
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
donationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
donationSchema.index({ donorId: 1 });
donationSchema.index({ patientId: 1 });
donationSchema.index({ status: 1 });
donationSchema.index({ verified: 1 });

module.exports = mongoose.model('Donation', donationSchema);
