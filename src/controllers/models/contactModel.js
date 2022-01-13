const mongoose = require('../mongo');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  user_id: mongoose.Types.ObjectId,
  contact_user_id: mongoose.Types.ObjectId,
  name: String,
  blocked: Boolean,
});

var Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;