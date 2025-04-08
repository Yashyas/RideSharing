const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String, // "rider" or "driver"
  location: {
    lat: Number,
    lng: Number
  },
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', UserSchema);
