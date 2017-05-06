var express = require("express"),
	router = express.Router(),
	controller = require.main.require("./controllers/test-user.controller.js");

router.post("/like", controller.like);

router.post("/dislike", controller.dislike);

module.exports = router
