const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const RequestSchema = new Schema({
  from: mongoose.Types.ObjectId,
  to: mongoose.Types.ObjectId,
  date: { type: Date, default: Date.now },
  amount: Number,
  currency: {type: String, enum: ["$", "€"]},
  status: {type: String, enum: ["pending", "accepted", "declined"], default:"pending"},
});

var Request = mongoose.model("request", RequestSchema);

module.exports = Request;