var request = require('request');
var configs = require('./../config');


const mainController = {};
// Empty object

mainController.get = (req, res) => {
    res.send(" Nodejs is up and running.. ");
};

module.exports =  mainController;