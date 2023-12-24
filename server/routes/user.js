const express = require('express');
const {
    signup,
    login,
    getAccountDetails
} = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth/admin');
const router = express();

router.route("/signup").post(signup);
router.route("/login").post(login);


router.route("/me")
    .get(isAuthenticated, getAccountDetails);


module.exports = router;