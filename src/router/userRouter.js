const express = require('express');
const { UserController } = require('../controllers')
const {body} = require("express-validator");
const UserRouter = express.Router();


UserRouter.get('/', UserController.findAll);

// UserRouter.get('/:id', UserController.findOne);
UserRouter.get('/name/:id', UserController.findOneName);
UserRouter.get('/:id/contacts', UserController.findContacts);

UserRouter.get('/:id/payment_methods', UserController.findPaymentMethods);

UserRouter.get('/:id/payments', UserController.findPayments);

UserRouter.post('/', body("email", "Email must be a valid email.").isEmail(),
    UserController.create)

    UserRouter.get('/me', UserController.findOne);

UserRouter.delete('/:id', UserController.delete);

UserRouter.patch('/:id', UserController.update);

UserRouter.put('/:id', UserController.update);


module.exports = { UserRouter };