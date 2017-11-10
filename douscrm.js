var express = require('express');
var routes = require('./routes');

var app = express();

app.use(express.static('public'));

routes(app);

app.listen(3000, function () {
	console.log('START PROJECT - PORT: 3000');
});