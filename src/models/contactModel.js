const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ContactSchema = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId
  },
  contact_name: String,
  contact_email: String,
  contact_img: String,
});

const Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;