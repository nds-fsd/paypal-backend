exports.findAll = (req, res) =>{


  const users = [{
    name: "Maria",
    age: 20,
    email: 'maria@gmail.com'
  },
  {
    name: "Pepe",
    age: 19,
    email: 'pepe@gmail.com'
  },
  {
    name: "Joana",
    age: 22,
    email: 'joana@gmail.com'
  }];
  

  res.status(200).json(users);
}

exports.findOne = (req, res) =>{

  const user = {
    id: req.params.id,
    name: "Maria",
    age: 20,
    email: 'maria@gmail.com'
  };
  

  res.status(200).json(user);
}


exports.create = (req, res) => {
  const data = req.body;

  if (data.password.length < 6) {
    res.status(401).json({Message: "Your password should be more strong"});
  } 

  const newUser = {
    email: data.email,
    password: data.password,
    name: data.name,
    description: data.description,
  };

  console.log('Creating user');

  res.status(201).json({Message: "Your new User was created Succesfully", newUser});
}

exports.delete = (req,res) => {
  const id = req.params.id;

  console.log(`user with id ${id} has been deleted`);
  
  res.send()

}

exports.update = (req,res) => {
  const id = req.params.id;
  const data = req.body;

  const newUser = {
    id: id,
    email: data.email,
    password: data.password,
    name: data.name,
    description: data.description,
  };

  res.status(200).json({message: "Your user has been updated Succesfully", newUser})
}
