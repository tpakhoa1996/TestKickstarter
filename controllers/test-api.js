var express = require('express'),
	router = express.Router(),
	kickstarter = require.main.require('./crawler/retrieveProject.js');

router.get('/', function(request, response) {
	var project = { 
		creator : 'strawberrystudio',
		code : 'strawberry-ninja'
	};

	kickstarter.crawler.queue([{
		uri: kickstarter.getUrl(project), 
		callback: function(err, res, done) {
			console.log("Crawling ...");
			if (err) {
				console.log(err);
			} else {
				console.log(kickstarter.retrieveData(res));
				response.render('test-api', {
					nav : 'api'
				});
			}
			done();
		}
	}]);
});

module.exports = router;
