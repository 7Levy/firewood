const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
app.set('port', '3000');

app.all('*', function (req, res, next) {    // cross-origin
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");    
    if (req.method == "OPTIONS") {
        res.send(200);       
    } else {
        next();
    }
});

const options = {
        target: 'https://ipfs.infura.io:5001/',
        changeOrigin: true,
    };
const exampleProxy = createProxyMiddleware(options);
app.use('/', exampleProxy);
app.listen(app.get('port'), () => {
 console.log(`server running @${app.get('port')}`);
});
