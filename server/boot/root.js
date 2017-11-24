'use strict';
const fs = require('fs');
const path = require('path');


module.exports = function(server) {
	// Install a `/` route that returns server status
	var router = server.loopback.Router();
	//router.get('/', server.loopback.status());

	


	router.get('/', (req, res) => {
		fs.readFile(path.normalize(`${__dirname}/../../client/index.html`), (error, content) => {
			res.send(content.toString());
		});
	});


	router.get('/api/users/logged', (req, res) => {
		const Token = server.models.AccessToken;
		
		if(!req.accessToken) {
			return res.json(false);
		}

		Token.findById(req.accessToken.id, (err, token) => {
			res.json(true);
		});
	});


	server.use(router);
};