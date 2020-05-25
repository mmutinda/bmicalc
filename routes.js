var express  = require('express');

// Controller imports
var mainController = require('./controllers/mainController');


const routes = express();

// Basic routes
routes.get('/', mainController.get);


module.exports  =  routes;