const express = require('express');
const { ContactController } = require('../controllers')

const ContactRouter = express.Router();


ContactRouter.get('/', ContactController.findAll);


ContactRouter.get('/:id', ContactController.findOne);

ContactRouter.post('/', ContactController.create);

ContactRouter.delete('/:id', ContactController.delete);

ContactRouter.patch('/:id', ContactController.update);
ContactRouter.put('/:id', ContactController.update);


module.exports = { ContactRouter };