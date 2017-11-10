/*global describe it before after*/
describe('Test', function() {
	describe('Dummy', function() {
		it('Its ok', function(done) {
			done();
		});

		it('Its ok method', function(done) {
			require('../routes/web/listener')({}, { send: () => {
				done();
			}});
		});
	});
});