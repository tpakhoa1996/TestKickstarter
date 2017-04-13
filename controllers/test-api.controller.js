let	kickstarter = require.main.require('./crawler/retrieveProject.js'),
	url = require('url'),
	Project = require.main.require('./models/Project.model.js');

exports.projectDisplay = (request, response) => {
	console.log('Receive a GET request');
	response.render('test-api', {
		nav: 'api',
		data: ''
	});
};

exports.projectSearch = (request, response) => {
	console.log('Receive a POST request');
	let urlOb = url.parse(request.body.link);
	let projectLink = 'https://' + urlOb.host + urlOb.pathname;
	console.log('Path: ' + projectLink);
	kickstarter.crawler.queue([{
		uri: projectLink, 
		callback: function(err, res, done) {
			if (err) {
				console.log("Geting DOM Object error");
				response.render('test-api', {
					data: {error: true},
					nav: 'api',
					prev_search: projectLink,
				});
			}
			else {
				console.log('Crawling ...');
				let data = kickstarter.retrieveData(res);
				data.projectLink = projectLink;
				let newProject = new Project(data);
				console.log(data.projectCompletionDate);
				response.render('test-api', {
					data: data,
					nav : 'api',
					prev_search: projectLink,
				});
				newProject.save((err) => {
					if (err)
						console.log('Error at saving data: ' + err);
					else
						console.log('Save data successfully' );
				});
			}
			done();
		}
	}]);
};

module.exports = exports;
