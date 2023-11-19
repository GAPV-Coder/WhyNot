const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');


const router = express.Router();

router.get('/all-users', isLoggedIn, isAdmin, userController.getAllUsers);

router.get('/user/:id', isLoggedIn, isAdmin, userController.getUserById);

router.patch('/update-user/:id', isLoggedIn, isAdmin, userController.updateUser);

router.delete('/delete-user/:id', isLoggedIn, isAdmin, userController.deleteUser);

module.exports = router;