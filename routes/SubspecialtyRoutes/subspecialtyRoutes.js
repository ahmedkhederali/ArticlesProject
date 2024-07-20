// routes/subspecialtyRoutes.js
const express = require('express');
const authAdmin=require("../../middleware/authAdmin")
const auth=require("../../middleware/auth")

const router = express.Router();
const subspecialtyController = require('../../controllers/SubspecialtyCtrl/SubspecialtyCtrl');

// Create a new subspecialty
router.post('/subspecialties', auth, authAdmin ,subspecialtyController.createSubspecialty);

// Get all subspecialties
router.get('/subspecialties', subspecialtyController.getSubspecialties);

// Get a subspecialty by ID
router.get('/subspecialties/:id', subspecialtyController.getSubspecialtyById);

// Update a subspecialty by ID
router.put('/subspecialties/:id', subspecialtyController.updateSubspecialty);

// Delete a subspecialty by ID
router.delete('/subspecialties/:id', auth, authAdmin , subspecialtyController.deleteSubspecialty);

module.exports = router;
