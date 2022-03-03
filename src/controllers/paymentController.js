var Payment = require('../models/paymentsModel.js');
var User = require('../models/userModel.js');

exports.findAll = async (req, res) =>{
  res.status(200).json(await Payment.find());
}

exports.findOne = async (req, res) =>{
  const payment = await Payment.findById(req.params.id);
  res.status(200).json(payment);
}

exports.create = async (req, res) => {
  const data = req.body;
  var newPayment = new Payment(data);

  const fromUser = await User.findById(data.from);
  const toUser = await User.findById(data.to);
  
  newPayment.save(
    function (err) {
      if (err) {
        console.log(err);
        return handleError(err);
      }
      else {
        // fromUser.wallet -= data.amount;
        // toUser.wallet += data.amount;
        
        if (data.currency=='$') 
            {
            if (fromUser.currency=='$' && toUser.currency=='$') 
            {
            fromUser.wallet -= data.amount;
            toUser.wallet += data.amount;
            }
            
            else if (fromUser.currency=='$' && toUser.currency=='€') {
            fromUser.wallet -= data.amount;
            toUser.wallet += 0.9*data.amount;
            }
            
            else if (fromUser.currency=='€' && toUser.currency=='€') {
            fromUser.wallet -= 0.9*data.amount;
            toUser.wallet += 0.9*data.amount;
            }
            
            else if (fromUser.currency=='€' && toUser.currency=='$') {
            fromUser.wallet -= 0.9*data.amount;
            toUser.wallet += data.amount;
            }
            }
        
        if (data.currency=='€') {
        
            if (fromUser.currency=='$' && toUser.currency=='$') 
            {
            fromUser.wallet -= 1.11*data.amount;
            toUser.wallet += 1.11*data.amount;
            }
            
            else if (fromUser.currency=='$' && toUser.currency=='€') {
            fromUser.wallet -= 1.11*data.amount;
            toUser.wallet += data.amount;
            }
            
            else if (fromUser.currency=='€' && toUser.currency=='€') {
            fromUser.wallet -= data.amount;
            toUser.wallet += data.amount;
            }
            
            else if (fromUser.currency=='€' && toUser.currency=='$') {
            fromUser.wallet -= data.amount;
            toUser.wallet += 1.11*data.amount;
            }
            }
        fromUser.save();
        toUser.save();
        }
    }
  );
  res.status(201).json({Message: "Your new payment was created Succesfully", newPayment});
}

exports.delete = (req,res) => {
  console.log(req.params.id);
  const id = req.params.id;
  
  Payment.deleteOne({_id: id}, function (err) {
    if (err) return handleError(err);
  });
  
  const deletedPayment = req.body;
  res.status(201).json({Message: "Your payment was deleted Succesfully",deletedPayment});
}

exports.update = async (req,res) => {
  const id = req.params.id;
  const data = req.body;
  
  const updatedPayment = await Payment.findOneAndUpdate({_id: id},data)
  res.status(200).json({message: "Your user has been updated Succesfully", updatedPayment})
}
