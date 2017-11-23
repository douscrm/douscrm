const requireDir = require('require-dir');
const web = requireDir('web');


module.exports = (app) => {
	app.get('/auth/', web.listener);
	app.get('*', web.listener);
};