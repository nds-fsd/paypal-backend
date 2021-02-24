const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: String,
  name: String,
  master: String,
  note: Number,
});

const Student = mongoose.model('Student', schema);

module.exports = Student;
