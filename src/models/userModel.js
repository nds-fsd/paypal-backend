const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: String,
  password: String,
  money: Number,
});

var User = model("user", UserSchema);

module.exports = User;