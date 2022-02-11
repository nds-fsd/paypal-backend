var Request = require('../models/requestModel.js');
var User = require('../models/userModel.js');

exports.findAll = async (req, res) =>{
  res.status(200).json(await Request.find());
}

exports.findOne = async (req, res) =>{
  const request = await Request.findById(req.params.id);
  res.status(200).json(request);
}

exports.create = async (req, res) => {
  const data = req.body;
  var newRequest = new Request(data);
  
  newRequest.save(
    function (err) {
      if (err) {
        console.log(err);
        return handleError(err);
      }
    }
  );
  res.status(201).json({Message: "Your new request was created Succesfully", newRequest});
}

exports.delete = (req,res) => {
  console.log(req.params.id);
  const id = req.params.id;
  
  Request.deleteOne({_id: id}, function (err) {
    if (err) return handleError(err);
  });
  
  const deletedRequest = req.body;
  res.status(201).json({Message: "Your payment was deleted Succesfully",deletedRequest});
}
