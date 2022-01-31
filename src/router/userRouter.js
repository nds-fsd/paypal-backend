const express = require('express');
const { UserController } = require('../controllers')

const UserRouter = express.Router();


UserRouter.get('/', UserController.findAll);

UserRouter.get('/:id', UserController.findOne);

UserRouter.get('/:id/contacts', UserController.findContacts);

UserRouter.get('/:id/payment_methods', UserController.findPaymentMethods);

UserRouter.get('/:id/payments', UserController.findPayments);

UserRouter.post('/', UserController.create);

UserRouter.delete('/:id', UserController.delete);

UserRouter.patch('/:id', UserController.update);

UserRouter.put('/:id', UserController.update);


module.exports = { UserRouter };