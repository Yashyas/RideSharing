const Ride = require('../models/Ride');

// Rider books a ride
exports.bookRide = async (req, res) => {
  const { riderId, pickup, drop } = req.body;

  try {
    const ride = await Ride.create({ riderId, pickup, drop });

    const io = req.app.get('io');
    if (io) {
      io.emit('new_ride', ride);
    }

    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all pending rides (for drivers)
exports.getAvailableRides = async (req, res) => {
  try {
    const rides = await Ride.find({ status: 'pending' }).populate('riderId', 'name email');
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
    ).populate('riderId driverId', 'name email');

    const io = req.app.get('io');
    if (io) {
      io.emit('ride_accepted', ride);
    }

    res.json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ride complete marked by rider.
exports.completeRide = async (req, res) => {
  const { rideId } = req.params;

  try {
    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { status: 'completed' },
      { new: true }
    ).populate('riderId driverId', 'name email');

    const io = req.app.get('io');
    if (io) {
      io.emit('ride_completed', ride); // emits to all riders
    }

    res.json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Rider ride history
exports.getRiderHistory = async (req, res) => {
  try {
    const rides = await Ride.find({ riderId: req.params.riderId }).populate('driverId', 'name email');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Driver accepted rides
exports.getDriverRides = async (req, res) => {
  try {
    const rides = await Ride.find({ driverId: req.params.driverId }).populate('riderId', 'name email');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

