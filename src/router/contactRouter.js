const express = require('express');
const { ContactController } = require('../controllers')
const { authMiddleware } = require('../auth/authMiddleware');

const ContactRouter = express.Router();



ContactRouter.get('/', ContactController.findAll);

ContactRouter.get('/:id', ContactController.findOne);

ContactRouter.post('/', authMiddleware, ContactController.create);

ContactRouter.delete('/:id', ContactController.delete);

ContactRouter.patch('/:id', ContactController.update);

ContactRouter.put('/:id', ContactController.update);


module.exports = { ContactRouter };