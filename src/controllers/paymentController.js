var Payment = require('../models/paymentsModel.js');

exports.findAll = async (req, res) =>{
  res.status(200).json(await Payment.find());
}

exports.findOne = async (req, res) =>{
  const payment = await Payment.findById(req.params.id);
  res.status(200).json(payment);
}

exports.create = (req, res) => {
  const data = req.body;
  var newPayment = new Payment(data);
  
  newPayment.save(
    function (err) {
      if (err) return handleError(err);
      else{
        //Quitar/poner dinero
      }
    }
  );
  res.status(201).json({Message: "Your new User was created Succesfully", newPayment});
}

exports.delete = (req,res) => {
  console.log(req.params.id);
  const id = req.params.id;
  
  Payment.deleteOne({_id: id}, function (err) {
    if (err) return handleError(err);
  });
  
  const deletedPayment = req.body;
  res.status(201).json({Message: "Your User was deleted Succesfully",deletedPayment});
}

exports.update = async (req,res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedPayment = await Payment.findAndUpdate({_id: id},data)
  res.status(200).json({message: "Your user has been updated Succesfully", updatedPayment})
}
