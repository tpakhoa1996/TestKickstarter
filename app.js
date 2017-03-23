var express = require('express'),
	app = express(),
	path = require('path'),
	server = require('http').createServer(app),
	open = require('open');

server.listen('8080');
console.log('Server is running ...');
open('http://localhost:8080');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static('public'));

app.get('/', function(request, response) {
	response.render('main', { nav: 'about' });
});

app.use('/test-model', require('./controllers/test-model.js'));

app.use('/test-api', require('./controllers/test-api.js'));
