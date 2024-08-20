// routes/doctorRoutes.js
const express = require('express');
const authAdmin=require("../../middleware/authAdmin")
const auth=require("../../middleware/auth")

const router = express.Router();
const adminController = require('../../controllers/AdminCtrl/AdminCtrl');

// Create a new doctor

// Get all doctors
router.get('/dashboard',auth,authAdmin, adminController.getDashboardData);
router.get('/doc_dashboard',auth,authAdmin, adminController.getAllDoctorForSpecifiy);
router.get('/nursing_dashboard',auth,authAdmin, adminController.getAllNursingByGender);
router.get('/medical_dashboard',auth,authAdmin, adminController.getMedicalLabCounts);

module.exports = router;
