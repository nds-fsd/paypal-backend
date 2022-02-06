const express = require('express');
const { UserController } = require('../controllers')
const {body} = require("express-validator");
const UserRouter = express.Router();


UserRouter.get('/', UserController.findAll);

// UserRouter.get('/:id', UserController.findOne);

UserRouter.get('/:id/contacts', UserController.findContacts);

UserRouter.get('/:id/payment_methods', UserController.findPaymentMethods);

UserRouter.get('/:id/payments', UserController.findPayments);

UserRouter.post('/', body("email", "Email must be a valid email.").isEmail(),
body("password", "Password must have a minimum length of 8 and At least one digit [0-9]\n" +
    "At least one lowercase character [a-z]\n" +
    "At least one uppercase character [A-Z]\n" +
    "At least one special character [*.!@#$%^&(){}[]:;<>,.?/~_+-=|\\]").isLength({min:8}).matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\])$"),
    UserController.create).get('/', UserController.findOne);

UserRouter.delete('/:id', UserController.delete);

UserRouter.patch('/:id', UserController.update);

UserRouter.put('/:id', UserController.update);


module.exports = { UserRouter };