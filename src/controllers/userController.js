// const db = require('./mongo');
var User = require('./models/userModel');
var Contact = require('./models/contactModel');
var PaymentMethod = require('./models/payment_methodModel.js');
var Payment = require('./models/paymentsModel.js');

exports.findAll = async (req, res) =>{
  res.status(200).json(await User.find());
}

exports.findOne = async (req, res) =>{
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
}

exports.findContacts = async (req, res) =>{
  const contacts = await Contact.find({user_id: req.params.id});
  res.status(200).json(contacts);
}

exports.findPaymentMethods = async (req, res) =>{
  const payment_methods = await PaymentMethod.find({user_id: req.params.id});
  res.status(200).json(payment_methods);
}

exports.findPayments = async (req, res) =>{
  const payments = await Payment.find({$or: [{from: req.params.id}, {to: req.params.id}]});
  res.status(200).json(payments);
}

exports.create = (req, res) => {
  const data = req.body;
  var newUser = new User(data);
  
  newUser.save(
    function (err) {
      if (err) return handleError(err);
    }
  );
  res.status(201).json({Message: "Your new User was created Succesfully", newUser});
}

exports.delete = (req,res) => {
  console.log(req.params.id);
  const id = req.params.id;
  
  User.deleteOne({_id: id}, function (err) {
    if (err) return handleError(err);
  });
  
  const deletedUser = req.body;
  res.status(201).json({Message: "Your User was deleted Succesfully",deletedUser});
}

exports.update = async (req,res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedUser = await User.findAndUpdate({_id: id},data)
  res.status(200).json({message: "Your user has been updated Succesfully", updatedUser})
}
