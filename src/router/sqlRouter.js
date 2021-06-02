const express = require('express');
const { SqlController } = require('../controllers')

const SqlRouter = express.Router();


SqlRouter.get('/', SqlController.query);


module.exports = { SqlRouter };