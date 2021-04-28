const mongoose = require('mongoose');
const schema = new mongoose.Schema({
	email: { type: String, required: true, unique: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
	description: {type: String, required: false},
}, {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }});

schema.index({ description: 'text', email: 'text', name: 'text'});

const User = mongoose.model('User', schema);


module.exports = User;