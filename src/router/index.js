const express = require('express');

const { UserRouter } = require('./userRouter');

const appRouter = express.Router();

appRouter.use('/users', UserRouter);

module.exports = appRouter;