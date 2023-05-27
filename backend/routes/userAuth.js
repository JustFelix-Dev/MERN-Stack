const express = require('express');
const router = express.Router();
const { logIn,signUp } = require('../controllers/userAuthController')

// Login Page
router.post('/login',logIn)

// SignUp Page
router.post('/signup',signUp)

module.exports = router