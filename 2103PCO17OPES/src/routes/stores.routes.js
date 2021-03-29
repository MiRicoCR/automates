const express = require('express');
let Router = express.Router();

const ctrlr = require('../controllers/form.controller');

Router.get('/customer/:store', ctrlr.instanceQuizz);
Router.post('/reward', ctrlr.insertData);
Router.get('/reward', (req, res) => {res.render('reward.html')});

module.exports = Router;