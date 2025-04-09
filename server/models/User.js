// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   role: String, // "rider" or "driver"
//   location: {
//     lat: Number,
//     lng: Number
//   },
//   isAvailable: { type: Boolean, default: true }
// });

// module.exports = mongoose.model('User', UserSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['rider', 'driver'], required: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
