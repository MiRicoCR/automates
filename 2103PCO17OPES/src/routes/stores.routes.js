const express = require('express');
let Router = express.Router();

const ctrlr = require('../controllers/form.controller');

Router.get('/customer/:store', ctrlr.instanceQuizz);
Router.post('/reward', ctrlr.insertData);
Router.get('/reward', ctrlr.showReward);
Router.get('/testing', ctrlr.showReward);

module.exports = Router;