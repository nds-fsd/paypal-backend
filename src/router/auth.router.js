const express = require('express');
const { AuthController } = require('../controllers')

const AuthRouter = express.Router();

AuthRouter.get('/', AuthController.auth);

module.exports = { AuthRouter };