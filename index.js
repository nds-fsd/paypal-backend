
require('dotenv').config();

const express = require('express')
const cors = require('cors')
const mongoConnection = require('./src/mongo')

const bodyParser = require('body-parser')
const appRouter = require('./src/router');

const app = express();
const port = 3090;

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.use("/", appRouter);