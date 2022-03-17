var Payment = require('../models/paymentsModel.js');
var User = require('../models/userModel.js');
const CC = require('../../node_modules/currency-converter-lt');
var currencyConverter = new CC()

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
            fromUser.save();
            toUser.wallet += data.amount;
            toUser.save();
            }
            
            else if (fromUser.currency=='$' && toUser.currency=='€') 
            {
              fromUser.wallet -= data.amount;
              fromUser.save();
              
              currencyConverter.from("USD").to("EUR").amount(data.amount).convert()
              .then((response) => {
                toUser.wallet +=response/100;
                toUser.save();
              })
            }
            
            else if (fromUser.currency=='€' && toUser.currency=='€') 
            {
            currencyConverter.from("USD").to("EUR").amount(data.amount).convert()
              .then((response) => {
                fromUser.wallet -=response/100;
                fromUser.save();
              })
            
            currencyConverter.from("USD").to("EUR").amount(data.amount).convert()
              .then((response) => {
                toUser.wallet +=response/100;
                toUser.save();
              })
            }
            
            else if (fromUser.currency=='€' && toUser.currency=='$') 
            {
            currencyConverter.from("USD").to("EUR").amount(data.amount).convert()
              .then((response) => {
                fromUser.wallet -=response/100;
                fromUser.save();
              })

            toUser.wallet += data.amount;
            toUser.save();
            }
            }
        
        if (data.currency=='€') {
        
            if (fromUser.currency=='$' && toUser.currency=='$') 
            {
            currencyConverter.from("EUR").to("USD").amount(data.amount).convert()
              .then((response) => {
                fromUser.wallet -=response/100;
                fromUser.save();
              })
            
            currencyConverter.from("EUR").to("USD").amount(data.amount).convert()
              .then((response) => {
                toUser.wallet +=response/100;
                toUser.save();
              })
            }
            
            else if (fromUser.currency=='$' && toUser.currency=='€') {
              currencyConverter.from("EUR").to("USD").amount(data.amount).convert()
              .then((response) => {
                fromUser.wallet -=response/100;
                fromUser.save();
              })
              
            toUser.wallet += data.amount;
            toUser.save();
            }
            
            else if (fromUser.currency=='€' && toUser.currency=='€') {
            fromUser.wallet -= data.amount;
            fromUser.save();
            toUser.wallet += data.amount;
            toUser.save();
            }
            
            else if (fromUser.currency=='€' && toUser.currency=='$') 
            {
            fromUser.wallet -= data.amount;
            fromUser.save();

            currencyConverter.from("EUR").to("USD").amount(data.amount).convert()
              .then((response) => {
                toUser.wallet +=response/100;
                toUser.save();
              })
            }
            }
        // fromUser.save();
        // toUser.save();
        }
    }
  );
  res.status(201).json({Message: "Your new payment was created Succesfully", newPayment});
}

exports.delete = (req,res) => {
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
