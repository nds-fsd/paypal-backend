// const db = require('./mongo');
var User = require('./models/userModel');

exports.findAll = async (req, res) =>{
  const name = req.query.username;
  const password = req.query.password;

  if(!name){
    return res.status(200).json(await User.find());
  }
  else if(!password){
    const findUser = await User.find({username: name} );
    if(findUser[0] !== undefined) return res.status(200).json({Message: "Found"});
    else return res.status(200).json({Message: "NotFound"});
  }
  var user = (await User.find({username: name}));
  if(user[0] !== undefined){
    if(user[0].username !== undefined){
    
      if(user[0].password === password){
        return res.status(200).json(user);
      }
      else res.status(200).json({Message: "Wrong Password"})
    }
    else{
      res.status(200).json({Message: "Wrong User"})
    }
  }
  else{
    res.status(200).json({Message: "Wrong User"})
  }
}

exports.findOne = async (req, res) =>{

  const user2 = await User.findById(req.params.id);
  res.status(200).json(user2);
}

exports.create = (req, res) => {
  const data = req.body;

  var newUser = new User(data);
  
  newUser.save(
    function (err) {
      if (err) return handleError(err);
    }
  );

  console.log('Creating user');

  res.status(201).json({Message: "Your new User was created Succesfully", newUser});
}

exports.delete = (req,res) => {
  console.log(req.params.id);
  const id = req.params.id;
  
  User.deleteOne({_id: id}, function (err) {
    if (err) return handleError(err);
  });
  console.log(`user with id ${id} has been deleted`);
  
  const deletedUser = req.body;

  res.status(201).json({Message: "Your User was deleted Succesfully",deletedUser});
}

exports.update = async (req,res) => {
  const id = req.params.id;
  const data = req.body;

  const updatedUser = await User.findAndUpdate({_id: id},data)

  res.status(200).json({message: "Your user has been updated Succesfully", updatedUser})
}
