// routes/specialtyRoutes.js
const express = require('express');
const authAdmin=require("../../middleware/authAdmin")
const auth=require("../../middleware/auth")

const router = express.Router();
const specialtyController = require('../../controllers/SpecialtyCtrl/SpecialtyCtrl');

// Create a new specialty
router.post('/specialties',  auth, authAdmin , specialtyController.createSpecialty);

// Get all specialties
router.get('/specialties', specialtyController.getSpecialties);

// Get a specialty by ID
router.get('/specialties/:id', specialtyController.getSpecialtyById);

// Update a specialty by ID
router.put('/specialties/:id', specialtyController.updateSpecialty);

// Delete a specialty by ID
router.delete('/specialties/:id',  auth, authAdmin , specialtyController.deleteSpecialty);

module.exports = router;
