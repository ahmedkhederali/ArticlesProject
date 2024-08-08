// routes/doctorRoutes.js
const express = require('express');
const authAdmin=require("../../middleware/authAdmin")
const auth=require("../../middleware/auth")

const router = express.Router();
const doctorController = require('../../controllers/DoctorCtrl/DoctorCtrl');

// Create a new doctor
router.post('/doctors', auth, authAdmin ,doctorController.createDoctor);

// Get all doctors
router.get('/doctors', doctorController.getDoctors);

// Get a doctor by ID
router.get('/doctors/:id', doctorController.getDoctorById);

// Update a doctor by ID
router.put('/doctors/:id', doctorController.updateDoctor);

// Delete a doctor by ID
router.delete('/doctors/:id', auth, authAdmin , doctorController.deleteDoctor);

// get All Doctors based on specialty
router.get('/doctors/specialty/:specialtyId', doctorController.getDoctorsBySpecialty);

module.exports = router;
