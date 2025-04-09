const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

// Rider books a ride
router.post('/request', rideController.bookRide);

// Drivers fetch pending rides
router.get('/available', rideController.getAvailableRides);

// Driver accepts a ride
router.post('/accept/:rideId', rideController.acceptRide);

// Rider ride history
router.get('/history/:riderId', rideController.getRiderHistory);

// Driver accepted rides
router.get('/driver/:driverId', rideController.getDriverRides);

module.exports = router;
