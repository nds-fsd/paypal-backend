const express = require('express');
const { UserController } = require('../controllers')

const UserRouter = express.Router();


UserRouter.get('/', UserController.findAll);


UserRouter.get('/:id', UserController.findOne);

UserRouter.post('/', UserController.create);

UserRouter.delete('/:id', UserController.delete);

UserRouter.patch('/:id', UserController.update);
UserRouter.put('/:id', UserController.update);


module.exports = { UserRouter };