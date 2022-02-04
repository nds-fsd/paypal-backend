const express = require('express');
const { loginController } = require('../controllers');


const loginRouter = express.Router();


loginRouter.post('/login', loginController.login);
loginRouter.get('/me', loginController.getUser);


module.exports = loginRouter;