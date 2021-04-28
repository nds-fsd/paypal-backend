require('./connection');
const Student = require('./schemas/Student');
const User = require("./schemas/user.js");


module.exports = {
  Student: Student,
  User: User,
}
