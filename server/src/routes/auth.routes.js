const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { validateRegistration, validateLogin } = require('../middlewares/validation.middleware');

const router = express.Router();

router.post('/register', validateRegistration, AuthController.registerUser);

router.post('/login', validateLogin, AuthController.loginUser);

module.exports = router;