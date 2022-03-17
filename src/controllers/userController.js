// const db = require('./mongo');
const User = require('../models/userModel');
const Contact = require('../models/contactModel');
const PaymentMethod = require('../models/payment_methodModel.js');
const Payment = require('../models/paymentsModel.js');
const Request = require('../models/requestModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");


exports.findAll = async (req, res) =>{
  res.status(200).json(await User.find());
};


exports.findContacts = async (req, res) =>{
  const contacts = await Contact.find({user_id: req.sessionUser._id});
  res.status(200).json(contacts);
};

exports.findPaymentMethods = async (req, res) =>{
  const payment_methods = await PaymentMethod.find({user_id: req.params.id});
  res.status(200).json(payment_methods);
};

exports.findPayments = async (req, res) =>{
  const user = req.sessionUser;
  const payments = await Payment.find({$or: [{from: user._id}, {to: user._id}]});
  res.status(200).json(payments);
};

exports.findRequests = async (req, res) =>{
  const user = req.sessionUser;
  const requests = await Request.find({to: user._id});
  res.status(200).json(requests);
};
  
exports.create = async (req, res) => {
    const { name, surname, email, password, currency } = req.body;
    const existingUser = await User.findOne( { email: email })

    if(existingUser) {
      res.status(409).json({Message:"Username already in use"})
    } 

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json(errors);
    }
    const genSalt = 10;
    const passwordHashed = bcrypt.hashSync(password, genSalt);
  
    const newUser = new User ({
      name: name,
      surname: surname,
      email: email,
      password: passwordHashed,
      currency: currency,
    });
    const userSaved = await newUser.save();
  
    const token = jwt.sign({ id: userSaved._id }, process.env.JWT_SECRET, {expiresIn: '1h' });
    return res.status(201).json({ token: token, id: userSaved._id  });
    
  };
  
  exports.findOne = async (req, res) =>{

    return res.status(200).json(req.sessionUser);
  };

    exports.delete = (req,res) => {
    const id = req.params.id;
  
    User.deleteOne({_id: id}, function (err) {
      if (err) return handleError(err);
  });
  
  const deletedUser = req.body;
    res.status(201).json({Message: "Your User was deleted Succesfully",deletedUser});
};

exports.findOneName = async (req, res) =>{
  let id = req.params.id;
  const userData = await User.findById(id);
  return res.status(200).json(userData.name);
};

exports.findOneEmail = async (req, res) =>{
  let id = req.params.id;
  const userData = await User.findById(id);
  return res.status(200).json(userData.email);
};

exports.findOneId = async (req, res) =>{
  let email = req.params.email;
  const userData = await User.find({"email": email});
  if(!userData[0]) return res.status(201).json(null);
  return res.status(200).json(userData[0]._id);
};

exports.update = async (req,res) => {
  const user = req.sessionUser;
  const id = user._id
  const data = req.body;

  savedUser = await User.find({_id:id});


  if (data.password && data.password.length>0 && data.password !== savedUser[0].password) {
    const genSalt = 10;
    const passwordHashed = bcrypt.hashSync(data.password, genSalt);
    data.password=passwordHashed;
  } 
  
  else {
    data.password = savedUser.password;
  }


  const contacts = await Contact.find({contact_email: user.email})
  contacts.forEach(contact => {
    if(contact.contact_name !== (data.name + " " + data.surname)) contact.contact_name = (data.name + " " + data.surname);
    if(contact.contact_email !== data.email) contact.contact_email = data.email;
    if(contact.contact_img !== data.image) contact.contact_img = data.image;
    contact.save();
  });
  
  const updatedUser = await User.findOneAndUpdate({_id: id},data)
  return res.status(200).json({ message: "Your user has been updated succesfully", updatedUser});
};











