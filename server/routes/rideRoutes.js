const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

router.post('/request', rideController.bookRide);
router.get('/available', rideController.getAvailableRides);
router.post('/accept/:rideId', rideController.acceptRide);
router.get('/history/:riderId', rideController.getRiderHistory);
router.get('/driver/:driverId', rideController.getDriverRides);

module.exports = router;
