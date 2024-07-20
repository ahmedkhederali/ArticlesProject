const express = require('express');
const authAdmin=require("../../middleware/authAdmin")
const auth=require("../../middleware/auth")

const router = express.Router();
const userController = require('../../controllers/UserCtrl/UserCtrl');

router.route('/login').post(userController.login);
router.route('/register').post(userController.register);
router.route('/users').get(auth,userController.GetAllUsers);
router.route('/users/:id').get(auth,userController.getUserById)
                        .delete(auth,authAdmin,userController.deleteUser)
                        .put(auth,userController.updateUser)
                        .patch(auth,userController.updateUserProfileImg);
// router.route('/forget').post(userController.forgetPassword);
router.route('/reset/:token').put(userController.resetPassword)
router.route('/changepassword/:id').patch(auth,userController.ChangePassword);

module.exports = router;