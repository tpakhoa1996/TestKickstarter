var express = require('express'),
	router = express.Router();

router.get('/', function(request, response) {
	response.render('test-api', {nav: 'api'});
});

module.exports = router;
