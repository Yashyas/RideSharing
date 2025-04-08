const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  pickup: { lat: Number, lng: Number },
  drop: { lat: Number, lng: Number },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ride', RideSchema);
