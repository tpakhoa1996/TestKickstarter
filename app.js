var express = require('express'),
	app = express(),
	path = require('path'),
	server = require('http').createServer(app),
	open = require('open');

server.listen('8080');
console.log('Server is running ...');
open('http://localhost:8080');

// Set configuration for template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/assets', express.static('assets'));

// Set controller
app.use('/test-model', require('./controllers/test-model.js'));
app.use('/test-api', require('./controllers/test-api.js'));

app.get('/', function(request, response) {
	response.render('main', {
		nav: 'about'
	});
});
