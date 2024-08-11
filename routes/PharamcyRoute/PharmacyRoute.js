const express = require('express');
const { createPharmacy, getPharmacies, getPharmacyById, updatePharmacy, deletePharmacy, ratePharmacy } = require('../../controllers/PharamcyCtrl/PharamacyCtrl');

const router = express.Router();
const authAdmin=require("../../middleware/authAdmin")
const auth=require("../../middleware/auth")

router.post('/pharmacies', auth , authAdmin ,createPharmacy);
router.get('/pharmacies', getPharmacies);
router.get('/pharmacies/:id', getPharmacyById);
router.put('/pharmacies/:id',  auth , authAdmin , updatePharmacy);
router.delete('/pharmacies/:id',  auth , authAdmin , deletePharmacy);
// rating Doctor
router.post('/pharmacies/rating/:pharmacyId', auth ,ratePharmacy);

module.exports = router;
