const express = require('express');
const router = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// home
router.get('/',  homeController.index);

// login
router.get('/login',loginController.index)

module.exports = router;