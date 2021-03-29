const fs = require('fs');
const https = require('https');
const app = require('./src/app');

https.createServer({
    key: fs.readFileSync('./keys/my_cert.key'),
    cert: fs.readFileSync('./keys/my_cert.crt')
}, app).listen('1337', () => {
    console.log(`Express running on port → 1337`)
});