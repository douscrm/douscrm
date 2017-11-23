'use strict'
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.static('public'));

routes(app);

const port = process.env.PORT | 3000;

app.listen(port, function () {
	console.log(`START PROJECT - PORT: ${port}`);
});