const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyparser = require('body-parser');
const path = require('path');
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

const app = express();

const routeStore = require('./routes/stores.routes');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/Views'));
//app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);

app.use(expressCspHeader({
    directives: {
        'default-src': [SELF],
        'script-src': [SELF, INLINE],
        'script-src-attr': [SELF],
        'style-src': [SELF, 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'],
        'worker-src': [NONE],
        'block-all-mixed-content': true
    }
}));

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/', routeStore);

module.exports = app;