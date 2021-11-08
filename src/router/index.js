const express = require('express');
const { UserRouter } = require('./userRouter');

const appRouter = express.Router();


appRouter.use('/user', UserRouter);


module.exports = appRouter;