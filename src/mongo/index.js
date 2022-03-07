const mongoose = require('mongoose');
const databaseURL = process.env.DATABASE_URL;

mongoose.connect(databaseURL);

const mongo = mongoose.connection;
mongo.on('error', (error) => console.error(error));
mongo.once('open', () => {
    console.log('connected to PayDay database');
});

module.exports = mongo;