var PaymentMethod = require('../models/payment_methodModel.js');

exports.findAll = async (req, res) =>{
  res.status(200).json(await PaymentMethod.find());
}

exports.findOne = async (req, res) =>{
  const payment_method = await PaymentMethod.findById(req.params.id);
  res.status(200).json(payment_method);
}

exports.create = (req, res) => {
  const data = req.body;
  var newPaymentMethod = new PaymentMethod(data);
  
  newPaymentMethod.save(
    function (err) {
      if (err) return handleError(err);
    }
  );
  res.status(201).json({Message: "Your new PaymentMethod was created Succesfully", newPaymentMethod});
}

exports.delete = (req,res) => {
  const id = req.params.id;
  
  PaymentMethod.deleteOne({_id: id}, function (err) {
    if (err) return handleError(err);
  });
  
  const deletedPaymentMethod = req.body;
  res.status(201).json({Message: "Your User was deleted Succesfully",deletedPaymentMethod});
}

exports.update = async (req,res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedPaymentMethod = await PaymentMethod.findAndUpdate({_id: id},data)
  res.status(200).json({message: "Your user has been updated Succesfully", updatedPaymentMethod})
}
