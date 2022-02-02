const express = require('express');
const { loginController } = require('../controllers');


const loginRouter = express.Router();


loginRouter.post('/', loginController.getUser);


module.exports = loginRouter;