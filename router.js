const express = require('express');
const router = express.Router();
const {loginRequired} = require('./src/middlewares/middleware');

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController')
// home
router.get('/',  homeController.index);

// login
router.get('/login',loginController.index)
router.post('/login/registerUser', loginController.registerUser)
router.post('/login/userLogin', loginController.userLogin)
router.get('/logout', loginController.logout)

//contato 

router.get('/contato/', loginRequired, contatoController.index)
router.post('/contato/registerContato', loginRequired, contatoController.registerContato)
router.get('/contato/:id', contatoController.edit)
router.post('/contato/:id', contatoController.update)
router.get('/contato/delete/:id', contatoController.delete)
module.exports = router;