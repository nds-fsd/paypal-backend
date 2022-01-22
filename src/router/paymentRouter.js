const express = require('express');
const { PaymentController } = require('../controllers')

const PaymentRouter = express.Router();


PaymentRouter.get('/', PaymentController.findAll);


PaymentRouter.get('/:id', PaymentController.findOne);

PaymentRouter.post('/', PaymentController.create);

PaymentRouter.delete('/:id', PaymentController.delete);

PaymentRouter.patch('/:id', PaymentController.update);
PaymentRouter.put('/:id', PaymentController.update);


module.exports = { PaymentRouter };