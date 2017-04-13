var express = require("express"),
	router = express.Router(),
	controller = require.main.require("./controllers/test-api.controller.js");

router.get("/", controller.projectDisplay);

router.post("/", controller.projectSearch);

module.exports = router;
