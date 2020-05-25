var express = require('express');
var fs = require('fs');
var https = require('https');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');// middleware 


var routes = require('./routes');
var configs = require('./config');


var app = express(); // init expreess 
var port = configs.port; // declare port
// app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function (req, res, next) {
   
//logging the incoming request data
    const opts = {
        errorEventName:'error',
            logDirectory:'/var/log/applications/c2blogs/', // NOTE: folder must exist and be writable...
            fileNamePattern:'roll-<DATE>.log',
            dateFormat:'YYYY.MM.DD'
    };
    const log = require('simple-node-logger').createRollingFileLogger( opts );
    log.info(req.body)


    next()
  })


app.use('/', routes);

app.post('/bmi-calc', function(request, response) {

    // parameters 
    /*
    * Weight Height 
    */

    const requestDataStr = request.body;
    const requestData = JSON.parse(requestDataStr);

    const height = requestData.height;
    const weight = requestData.weight;

    const h2 = height * height;
    const b = weight /  h2;

    let message = ``;
    if (b > 30) {
        message = `Obese`;
    } else if (b > 25) {
        message = `Overweight`;
    } else if (b > 18.5) {
        message = `Healthy`;
    } else {
        message = `Underweight`;
    }

    response.json({ bmi: b, message });
})

if (configs.env === 'prod') {

    var httpsOptions = {
        cert: fs.readFileSync(path.join(__dirname, 'certificate', 'star_uapoldmutual_com.crt')),
        key: fs.readFileSync(path.join(__dirname, 'certificate', 'star_uapoldmutual_com.key')),
        ca: [
            fs.readFileSync(path.join(__dirname, 'certificate', 'DigiCertCA.crt')),
        ]
    }

    https.createServer(httpsOptions, app)
        .listen(port, function () {
            console.log("Server is running");
        })

} else {
    console.log("dev mode...")
    http.createServer(app)
        .listen(port, function () {
            console.log("Server is running...✅");
        })
}

