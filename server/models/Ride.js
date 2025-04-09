const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  pickup: {
    type: String,
    required: true
  },
  drop: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Ride', RideSchema);
