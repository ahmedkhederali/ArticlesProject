// routes/degreeRoutes.js
const express = require('express');
const authAdmin=require("../../middleware/authAdmin")
const auth=require("../../middleware/auth")

const router = express.Router();
const degreeController = require('../../controllers/DegreeCtrl/DegreeCtrl');

// Create a new degree
router.post('/degrees', auth, authAdmin ,degreeController.createDegree);

// Get all degrees
router.get('/degrees', degreeController.getDegrees);

// Get a degree by ID
router.get('/degrees/:id', degreeController.getDegreeById);

// Update a degree by ID
router.put('/degrees/:id', degreeController.updateDegree);

// Delete a degree by ID
router.delete('/degrees/:id', auth, authAdmin ,degreeController.deleteDegree);

module.exports = router;
