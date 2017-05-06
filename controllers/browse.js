var express = require('express'),
	router = express.Router();

router.get('/', function(request, response) {
	response.render('project-browse', {
        nav: 'model'
    });
});

module.exports = router;
