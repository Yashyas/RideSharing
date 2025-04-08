const Ride = require('../models/Ride');
const { io } = require('../server');

// Rider books a ride
exports.bookRide = async (req, res) => {
  const { riderId, pickup, drop } = req.body;
  try {
    const ride = await Ride.create({ riderId, pickup, drop });
    io.emit('new_ride', ride); // notify drivers
    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Driver sees all pending rides
exports.getAvailableRides = async (req, res) => {
  try {
    const rides = await Ride.find({ status: 'pending' }).populate('riderId');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Driver accepts a ride
exports.acceptRide = async (req, res) => {
  const { rideId } = req.params;
  const { driverId } = req.body;

  try {
    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { driverId, status: 'accepted' },
      { new: true }
    );
    io.emit('ride_accepted', ride); // notify riders
    res.json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rider ride history
exports.getRiderHistory = async (req, res) => {
  try {
    const rides = await Ride.find({ riderId: req.params.riderId });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Driver accepted rides
exports.getDriverRides = async (req, res) => {
  try {
    const rides = await Ride.find({ driverId: req.params.driverId });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
