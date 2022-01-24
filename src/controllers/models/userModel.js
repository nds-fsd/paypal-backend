const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  money: Number,
});

var User = mongoose.model("user", UserSchema);

module.exports = User;