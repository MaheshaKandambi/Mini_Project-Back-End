const express = require('express');
const { signup, login } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated, validateLoginRequest } = require('../../validators/auth');
const router = express.Router();


router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/login', validateLoginRequest, isRequestValidated, login);



      


module.exports = router;