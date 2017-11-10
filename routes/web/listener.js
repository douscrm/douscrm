const fs = require('fs');
const path = require('path');


module.exports = (req, res) => {
	fs.readFile(path.normalize(`${__dirname}/../../public/app.html`), (error, content) => {
		res.send(content.toString());
	});
};