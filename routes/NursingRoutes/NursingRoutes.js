const express = require('express');
const nursingController = require('../../controllers/NursingCtrl/NursingCtrl');
const authAdmin=require("../../middleware/authAdmin")
const auth=require("../../middleware/auth")

const router = express.Router();

router.post('/nursing',auth,authAdmin, nursingController.createNursing);
router.get('/nursing', nursingController.getNurses);
router.get('/nursing/:id', nursingController.getNurseById);
router.put('/nursing/:id', auth,authAdmin, nursingController.updateNurse);
router.delete('/nursing/:id',auth,authAdmin, nursingController.deleteNurse);
// rating Doctor
router.post('/nursing/rating/:nursingId', auth ,nursingController.rateNursing);

module.exports = router;
