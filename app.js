var express = require("express"),
	app = express(),
	path = require("path"),
	server = require("http").createServer(app),
	open = require("open"),
	bodyParser = require("body-parser"),
	mongoose = require('mongoose');

server.listen("8080");
console.log("Server is running ...");

// Set configuration for template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use("/assets", express.static("public"));
app.use(bodyParser.urlencoded({extended: "true"}));

// Connect to mongodb
//var dbOptions = {
//	server: { poolSize: 10 },
//};
//mongoose.connect("mongodb://localhost:27017/project", dbOptions);

// Set controller
app.use("/test-ui", require("./routes/test-ui.route.js"));
app.use("/test-model", require("./routes/test-model.route.js"));
app.use("/test-api", require("./routes/test-api.route.js"));
app.use("/", require("./routes/home.route.js"));
app.use("/test-user", require("./routes/test-user.route.js"));
