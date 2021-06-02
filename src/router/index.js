const express = require('express');
const { UserRouter } = require('./userRouter');
const { SqlRouter } = require('./sqlRouter');

const appRouter = express.Router();


appRouter.use('/user', UserRouter);
appRouter.use('/sql', SqlRouter);


module.exports = appRouter;