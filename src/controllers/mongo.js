
const mongoose = require('mongoose');

mongoose.connect('mongodb://root:meow@localhost:27020/');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose