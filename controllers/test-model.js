var express = require('express'),
	router = express.Router();

router.get('/', function(request, response) {
	response.render('test-model', { nav: 'model' });
});

module.exports = router;
