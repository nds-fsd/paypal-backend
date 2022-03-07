const express = require('express');
const { UserController } = require('../controllers')
const {body} = require("express-validator");
const UserRouter = express.Router();
const { authMiddleware } = require('../auth/authMiddleware');


UserRouter.get('/', UserController.findAll);

// UserRouter.get('/:id', UserController.findOne);
UserRouter.get('/name/:id', UserController.findOneName);
UserRouter.get('/id/:email', UserController.findOneId);

UserRouter.get('/:id/contacts',authMiddleware, UserController.findContacts);

UserRouter.get('/:id/payment_methods', authMiddleware, UserController.findPaymentMethods);

UserRouter.get('/:id/payments', authMiddleware, UserController.findPayments);
UserRouter.get('/:id/requests', authMiddleware, UserController.findRequests);

UserRouter.post('/', body("email", "Email must be a valid email.").isEmail(),
authMiddleware, UserController.create)

UserRouter.get('/me', authMiddleware, UserController.findOne);

UserRouter.delete('/:id', authMiddleware, UserController.delete);

UserRouter.patch('/:id', authMiddleware, UserController.update);

UserRouter.put('/:id',authMiddleware, UserController.update);


module.exports = { UserRouter };