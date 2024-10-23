const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user');
const validateEmail = require("../middleware/validate-email");
const validatePassword = require("../middleware/password");


router.post('/signup',validatePassword, validateEmail, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;