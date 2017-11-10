const requireDir = require('require-dir');
const web = requireDir('web');


module.exports = (app) => {
	app.get('*', web.listener);
};