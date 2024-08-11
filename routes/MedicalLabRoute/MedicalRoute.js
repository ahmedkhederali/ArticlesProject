const express = require('express');
const { createMedicalLab, getMedicalLabs, rateMedicalLab ,getMedicalLabById, updateMedicalLab, deleteMedicalLab } = require('../../controllers/MedicalLabCtrl/MedicalLabCtrl');

const router = express.Router();
const authAdmin=require("../../middleware/authAdmin")
const auth=require("../../middleware/auth")

router.post('/medicallabs',auth,authAdmin, createMedicalLab);
router.get('/medicallabs', getMedicalLabs);
router.get('/medicallabs/:id', getMedicalLabById);
router.put('/medicallabs/:id', auth,authAdmin , updateMedicalLab);
router.delete('/medicallabs/:id', auth,authAdmin, deleteMedicalLab);
// rating Doctor
router.post('/medicallabs/rating/:medicalId', auth ,rateMedicalLab);
module.exports = router;
