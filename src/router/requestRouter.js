const express = require('express');
const { RequestController } = require('../controllers')

const RequestRouter = express.Router();


RequestRouter.get('/', RequestController.findAll);

RequestRouter.get('/:id', RequestController.findOne);

RequestRouter.post('/', RequestController.create);

RequestRouter.delete('/:id', RequestController.delete);


module.exports = { RequestRouter };