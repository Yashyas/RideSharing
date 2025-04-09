const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get user by ID
router.get('/:userId', userController.getUserById);

// Get all users (optional)
router.get('/', userController.getAllUsers);

module.exports = router;
