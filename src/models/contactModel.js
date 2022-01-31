const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ContactSchema = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId
  },
  contact_user_id: {
    type: mongoose.Types.ObjectId
  },
  name: String,
  blocked: Boolean,
});

const Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;