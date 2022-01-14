const express = require('express');
const { PaymentMethodController } = require('../controllers')

const PaymentMethodRouter = express.Router();


PaymentMethodRouter.get('/', PaymentMethodController.findAll);


PaymentMethodRouter.get('/:id', PaymentMethodController.findOne);

PaymentMethodRouter.post('/', PaymentMethodController.create);

PaymentMethodRouter.delete('/:id', PaymentMethodController.delete);

PaymentMethodRouter.patch('/:id', PaymentMethodController.update);
PaymentMethodRouter.put('/:id', PaymentMethodController.update);


module.exports = { PaymentMethodRouter };