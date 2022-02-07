const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
});

var User = model("user", UserSchema);

module.exports = User;