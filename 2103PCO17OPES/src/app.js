const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'pug')

app.use(morgan('dev'));
app.use(helmet());

console.log(__dirname)

app.get('/', (req, res) => {
    res.render('index');
});

module.exports = app;