var express = require('express'),
	router = express.Router(),
	kickstarter = require.main.require('./crawler/retrieveProject.js');

router.get('/', function(request, response) {
	var project = { 
		creator : 'projectcopper',
		code : 'original-limited-edition-geometric-iceberg-paintin'
	};

	kickstarter.crawler.queue([{
		uri: kickstarter.getUrl(project), 
		callback: function(err, res, done) {
			console.log("Crawling ...");
			if (err) {
				console.log(err);
			} else {
				data = kickstarter.retrieveData(res);
				console.log(data);
				response.render('test-api', {
					data: data,
					nav : 'api'
				});
			}
			done();
		}
	}]);
});

module.exports = router;
