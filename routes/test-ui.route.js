var express = require("express"),
	router = express.Router(),
	controller = require.main.require("./controllers/test-ui.controller.js");

router.get("/", controller.display);

module.exports = router;
