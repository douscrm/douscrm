'use strict';
module.exports = (app) => {
	const User = app.models.User;

	User.count((err, count) => {
		if(count == 0) {
			User.create({email: 'admin@douscrm.com', password: 'admin'}, (err, userInstance) => {
				console.log(userInstance);
			});
		}
	});
};