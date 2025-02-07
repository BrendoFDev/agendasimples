const express = require('express');
const router = express.Router();
const userController = require('./src/controllers/userController');

router.get('/',  userController.cadUser);
router.post('/', userController.receiveUser)
module.exports = router;
