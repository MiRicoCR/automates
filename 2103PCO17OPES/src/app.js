const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const app = express();

const routeStore = require('./routes/stores.routes');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/Views'));
//app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);

app.use(morgan('dev'));
app.use(helmet());

app.use('/', routeStore);

module.exports = app;