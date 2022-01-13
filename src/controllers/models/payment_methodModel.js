const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const Card = {
  card_user_name: String,
  card_number: Number,
  card_cvv: Number,
}

const Bank = {
  bank_iban_letters: String,
  bank_iban_numbers: Number,
}

const PaymentMethodSchema = new Schema({
  user_id: mongoose.Types.ObjectId,
  payment_method_type: { type: String, enum: ["card", "bank"]},
  payment_method_details: Object,
});

var PaymentMethod = mongoose.model("payment_method", PaymentMethodSchema);

module.exports = PaymentMethod;