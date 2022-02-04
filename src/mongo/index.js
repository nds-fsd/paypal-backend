require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST);

const mongo = mongoose.connection;
mongo.on('error', (error) => console.error(error));
mongo.once('open', () => {
    console.log('connected to PayDay database');
});

module.exports = mongo;