const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.login = async (req, res) => {
  
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  
  const genSalt = 10;
  const checkPassword = bcrypt.compareSync(password, user.password);

  if (!user) return res.status(400).send("Email does not exist");
  if (user && checkPassword) return res.status(400).send("Password does not match");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token: token });
};

exports.getUser = async (req, res) => {
   const token = req.headers.authorization.split(" ")[1];
 
   let tokenData;
   try {
     tokenData = jwt.verify(token, process.env.JWT_SECRET);
   } catch (e) {
     return res.status(400).send("Invalid token");
   }
 
   const userData = await User.findById(tokenData.id);
   return res.status(200).json(userData);
 };

