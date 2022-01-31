var Contact = require('../models/contactModel.js');

exports.findAll = async (req, res) =>{
  res.status(200).json(await Contact.find());
}

exports.findOne = async (req, res) =>{
  const contact = await Contact.findById(req.params.id);
  res.status(200).json(contact);
}

exports.create = (req, res) => {
  const data = req.body;
  var newContact = new Contact(data);
  
  newContact.save(
    function (err) {
      if (err) return handleError(err);
    }
  );
  res.status(201).json({Message: "Your new Contact was created Succesfully", newContact});
}

exports.delete = (req,res) => {
  console.log(req.params.id);
  const id = req.params.id;
  
  Contact.deleteOne({_id: id}, function (err) {
    if (err) return handleError(err);
  });
  
  const deletedContact = req.body;
  res.status(201).json({Message: "Your User was deleted Succesfully",deletedContact});
}

exports.update = async (req,res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedContact = await Contact.findAndUpdate({_id: id},data)
  res.status(200).json({message: "Your user has been updated Succesfully", updatedContact})
}
