const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  
  from: mongoose.Types.ObjectId,
  to: mongoose.Types.ObjectId,
  date: { type: Date, default: Date.now },
  amount: Number,
  currency: {type: String, enum: ["$", "€"]},
  payment_method: mongoose.Types.ObjectId,
});

var Payment = mongoose.model("payment", PaymentSchema);

module.exports = Payment;