'use strict';
const fs = require('fs');
const path = require('path');


module.exports = function () {
	//4XX - URLs not found
	return function customRaiseUrlNotFoundError(req, res, next) {
		fs.readFile(path.normalize(`${__dirname}/../../client/index.html`), (error, content) => {
			res.send(content.toString());
		});
	};
};