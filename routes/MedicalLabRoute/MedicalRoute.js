const express = require('express');
const { createMedicalLab, getMedicalLabs, getMedicalLabById, updateMedicalLab, deleteMedicalLab } = require('../../controllers/MedicalLabCtrl/MedicalLabCtrl');

const router = express.Router();

router.post('/medicallabs', createMedicalLab);
router.get('/medicallabs', getMedicalLabs);
router.get('/medicallabs/:id', getMedicalLabById);
router.put('/medicallabs/:id', updateMedicalLab);
router.delete('/medicallabs/:id', deleteMedicalLab);

module.exports = router;
