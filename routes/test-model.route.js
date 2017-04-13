var express = require('express'),
	router = express.Router(),
	controller = require.main.require("./controllers/test-model.controller.js");

router.get('/', controller.modelDisplay); 

module.exports = router;
