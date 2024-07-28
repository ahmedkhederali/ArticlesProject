const express = require('express');
const { createPharmacy, getPharmacies, getPharmacyById, updatePharmacy, deletePharmacy } = require('../../controllers/PharamcyCtrl/PharamacyCtrl');

const router = express.Router();

router.post('/pharmacies', createPharmacy);
router.get('/pharmacies', getPharmacies);
router.get('/pharmacies/:id', getPharmacyById);
router.put('/pharmacies/:id', updatePharmacy);
router.delete('/pharmacies/:id', deletePharmacy);

module.exports = router;
