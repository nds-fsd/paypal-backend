const express = require('express');

const { UserRouter } = require('./userRouter');
const { PaymentRouter } = require('./paymentRouter');

const appRouter = express.Router();

appRouter.use('/users', UserRouter);
appRouter.use('/payments', PaymentRouter);

module.exports = appRouter;