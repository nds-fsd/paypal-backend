const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-test');

const mongo = mongoose.connection;
mongo.on('error', (error) => console.error(error));
mongo.once('open', () => {
    console.log('connected to PayDay database');
});

module.exports = mongo;