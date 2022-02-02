const express = require('express');

const { UserRouter } = require('../router/userRouter');
const { PaymentRouter } = require('../router/paymentRouter');
const { ContactRouter } = require('../router/contactRouter');
const { PaymentMethodRouter } = require('../router/payment_methodRouter');
const loginRouter  = require('../router/loginRouter');



const appRouter = express.Router();

appRouter.use('/users', UserRouter);
appRouter.use('/payments', PaymentRouter);
appRouter.use('/contact', ContactRouter);
appRouter.use('/payment_method', PaymentMethodRouter);
appRouter.use('./login', loginRouter);

module.exports = appRouter;