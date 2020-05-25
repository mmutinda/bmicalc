var configs_live = {
     "env": "prod",
     "port": 9000,
     "error_message": "Something went wrong while trying to process your request. Kindly contact the api developer",
};
var configs_test = {
     "env": "dev",
     "port": 9000,
     "error_message": "Something went wrong while trying to process your request. Kindly contact the api developer",
}
const env = 'dev';
if (env === 'live') {
     configs = configs_live;
} else {
     configs = configs_test;
}

module.exports = configs