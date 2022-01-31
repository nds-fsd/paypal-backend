// const db = require('./mongo');
var User = require('./models/userModel');
var Contact = require('./models/contactModel');
var PaymentMethod = require('./models/payment_methodModel.js');
var Payment = require('./models/paymentsModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const MY_SALT_NUMBER = 10
const JWT_PRIVATE_KEY = 'liiiiiisa'

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

exports.create = async (req, res) => {
  const data = req.body;

  const existingUser = await User.findOne( { username: data.username })

  if(existingUser) {
    res.status(409).json({Message:"Username already in use"})
  } else {
    data.password = bcrypt.hashSync(data.password, MY_SALT_NUMBER);
    var newUser = new User(data);
    newUser.save(
      function (err) {
        if (err) return handleError(err);
      }
    );
    res.status(201).json({Message: "Your new User was created Succesfully", newUser, token: jwt.sign({username: newUser.username}, JWT_PRIVATE_KEY)});
  }
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

// const userModel = require("./user.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const {validationResult} = require("express-validator");

// const saveUser = async (req, res) => {
//   // Ideally, we would validate that the input coming from the request is well formed

//   const errors = validationResult(req);
//   if(!errors.isEmpty()){
//     return res.status(400).json(errors);
//   }
//   // We extract the email and password fields from the request body by destructuring
//   const { email, password } = req.body;

//   // We hash the password
//   const genSalt = 10;
//   const passwordHashed = bcrypt.hashSync(password, genSalt);

//   // We save on db a new user with the password hashed
//   const newUser = new userModel({
//     email: email,
//     password: passwordHashed,
//   });
//   const userSaved = await newUser.save();

//   // We sign a JWT and return it to the user
//   const token = jwt.sign({ id: userSaved._id }, process.env.JWT_SECRET);
//   return res.status(201).json({ token: token, user: userSaved  });
// };

exports.getUser = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  let tokenData;
  try {
    tokenData = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(400).send("Invalid token");
  }

  const userData = await userModel.findById(tokenData.id);
  return res.status(200).json(userData);
};

