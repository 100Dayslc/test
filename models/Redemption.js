
// models/Redemption.js
const mongoose = require('mongoose');

const redemptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rewardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward',
    required: true,
  },
  pointsCost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected'],
    default: 'pending',
  },
  code: {
    type: String,
  },
  completedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Redemption', redemptionSchema);
