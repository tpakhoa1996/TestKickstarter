var express = require('express'),
	router = express.Router(),
	controller = require.main.require("./controllers/home.controller.js");

router.get("/", controller.homeDisplay);

module.exports = router;
