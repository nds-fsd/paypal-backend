const {User} = require('../mongo');


exports.findAll = (req, res) =>{

const handleSuccess = (users) => {
  res.status(200).json(users)};
const handleError = error => {
  res.status(500).json(error);
}
  User.find().then(handleSuccess).catch(handleError);
}

exports.findOne = (req, res) =>{

  const id = req.params.id;
  User.findById(id).then((user) => {
    res.status(200).json(user);
  }).catch(error => {
    res.status(500).json(error);
  });
}


exports.create = (req, res) => {
  const data = req.body;

  const newUser = new User({
    email: data.email,
    password: data.password,
    name: data.name,
    description: data.description,
  })
  
  newUser.save()
  .then((newUser)=> { res.status(201).json({Message: "Your new User was created Succesfully", newUser})})
  .catch(error => { res.status(500).json(error)});

}

exports.delete = (req,res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
  .then(() => {
    res.status(200).json({message: "Your user has been deleted Succesfully"})
  })
  .catch(error=>{
    res.status(500).json(error);
  })
}

exports.update = (req,res) => {
  const id = req.params.id;
  const data = req.body;

  User.findByIdAndUpdate(id,data)
  .then(() => {
    res.status(200).json({
      message: "Your user has been updated Succesfully"})
  })
  .catch(error=>{
    res.status(500).json(error);
  })
}

//Search by text
exports.searchPagination = (req, res) => {

  const page = Math.max(0, req.query.page);
  const limit = req.query.limit ? Math.max(1, req.query.limit) : 5;
  const sort = req.query.sort;
  const sortDirection = req.query.dir || 'asc';

  let sortObject = {};

  if (sort && sortDirection) {
    sortObject[sort] = sortDirection === 'asc' ? 1 : -1;
  }

  const skip = page*limit;

  const query = {};

  console.log(sortObject);

  User.find({})
  .limit(limit)
  .skip(skip)
  .sort(sortObject)
  .then(objects => {
    res.status(200).json(objects);
  })
  .catch(error => {
    res.status(500).json(error);20
  });
}

//Search by text
exports.searchText = (req, res) => {

  const searchText = Object.keys(req.body)
    .reduce((acc, curr) => (`${acc} ${req.body[curr]}`), '');

  console.log(searchText);

  const query = { $text: { $search: searchText } };



  User.find(query, {score: {$meta: "textScore"}})
  .sort({score:{$meta:"textScore"}})
  .then(objects => {
    objects.filter(o => o.score > 1);
    res.status(200).json(objects);
  })
  .catch(error => {
    res.status(500).json(error);
  });
}

// Search by regexp
exports.search = (req, res) => {
  
  const searchTextReg = req.body.search.split(' ')
    .reduce((acc, curr) => (`${acc}.*${curr}`), '');


  const reg = new RegExp(searchTextReg);
  console.log(searchTextReg);
  const query2 = { $or: [{name: { $regex: reg}}, {email: { $regex: reg}}]};

  User.find(query2)
  .then(objects => {
    res.status(200).json(objects);
  })
  .catch(error => {
    res.status(500).json(error);
  });
  //User.find(querya)
  
}