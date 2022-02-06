// const db = require('./mongo');
const User = require('../models/userModel');
const Contact = require('../models/contactModel');
const PaymentMethod = require('../models/payment_methodModel.js');
const Payment = require('../models/paymentsModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");


exports.findAll = async (req, res) =>{
  res.status(200).json(await User.find());
};


exports.findContacts = async (req, res) =>{
  const contacts = await Contact.find({user_id: req.params.id});
  res.status(200).json(contacts);
};

exports.findPaymentMethods = async (req, res) =>{
  const payment_methods = await PaymentMethod.find({user_id: req.params.id});
  res.status(200).json(payment_methods);
};

exports.findPayments = async (req, res) =>{
  const payments = await Payment.find({$or: [{from: req.params.id}, {to: req.params.id}]});
  res.status(200).json(payments);
};
  
  exports.create = async (req, res) => {
    const existingUser = await User.findOne( { email: data.email })

    if(existingUser) {
      res.status(409).json({Message:"Username already in use"})
    } 

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json(errors);
    }
    
    const { email, password } = req.body;
  
    const genSalt = 10;
    const passwordHashed = bcrypt.hashSync(password, genSalt);
  
    const newUser = new userModel({
      email: email,
      password: passwordHashed,
    });
    const userSaved = await newUser.save();
  
    const token = jwt.sign({ id: userSaved._id }, process.env.JWT_SECRET);
    return res.status(201).json({ token: token, user: userSaved  });
    
  };
  
  exports.findOne = async (req, res) =>{
    const token = req.headers.authorization.split(" ")[1];
    let tokenData;
    try {
      tokenData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(400).send("invalid token");
    }
    const userData = await User.findById(tokenData.id);
    return res.status(200).json(userData);
  };


exports.delete = (req,res) => {
  console.log(req.params.id);
  const id = req.params.id;
  
  User.deleteOne({_id: id}, function (err) {
    if (err) return handleError(err);
  });
  
  const deletedUser = req.body;
  res.status(201).json({Message: "Your User was deleted Succesfully",deletedUser});
};

exports.update = async (req,res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedUser = await User.findAndUpdate({_id: id},data)
  res.status(200).json({message: "Your user has been updated Succesfully", updatedUser})
};








