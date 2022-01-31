const express = require('express');

const { UserRouter } = require('./userRouter');
const { PaymentRouter } = require('./paymentRouter');
const { ContactRouter } = require('./contactRouter');
const { PaymentMethodRouter } = require('./payment_methodRouter');
const { AuthRouter } = require('.//auth.router');



const appRouter = express.Router();

appRouter.use('/users', UserRouter);
appRouter.use('/payments', PaymentRouter);
appRouter.use('/contact', ContactRouter);
appRouter.use('/payment_method', PaymentMethodRouter);
appRouter.use('/login', AuthRouter);

module.exports = appRouter;