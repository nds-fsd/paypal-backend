
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/userModel");

exports.auth = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username: username });

  const genSalt = 10;
  const passwordHashed = bcrypt.hashSync(password, genSalt);

  if (!user) return res.status(400).send("Username not found");
  if (user && user.password !== passwordHashed) return res.status(400).send("Password does not match");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token: token });
};
