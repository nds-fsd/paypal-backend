
require('dotenv').config();


const express = require('express')
const cors = require('cors')
const mongoConnection = require('./src/mongo')

const bodyParser = require('body-parser')
const appRouter = require('./src/router');

const app = express();

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json());

const server = app.listen(port, (process.env.PORT), () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
});

app.use("/", appRouter);