const express = require('express');
let Router = express.Router();

const ctrlr = require('../controllers/form.controller');

Router.get('/:store', ctrlr.instanceQuizz);

module.exports = Router;