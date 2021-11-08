require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const appRouter = require('./src/router');

const app = express();
const port = 3001;
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use(bodyParser.json());



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.use("/",appRouter);