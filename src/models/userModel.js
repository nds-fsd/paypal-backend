const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  image: String,
  currency: String,
  wallet: { type: Number, default: 1000 },
});

var User = model("user", UserSchema);

module.exports = User;