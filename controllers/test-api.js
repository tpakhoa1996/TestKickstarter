var express = require('express'),
	router = express.Router(),
	crawler = require('kickstarter-crawler');

var config, project;


config = {
  url: 'https://www.kickstarter.com/projects/705320514/reverse-61-the-power-of-technology-for-workplace-e',
  fields: ['general', 'funding', 'location']
};
 
 
// Initialize the crawler 
project = new crawler.project(config);

project.request(function onRequest (err, data) {
 
  // Something broke 
  if (err) {
    console.log(err);
    return;
  }
 
  // Log crawled data 
  console.log(data);
 
});

console.log("=======================");

project.getTitle(function (err, data) {
	if (err) {
		console.log(err);
		return;
	}

	console.log(data);
});

router.get('/', function(request, response) {
	response.render('test-api', {nav: 'api'});
});

module.exports = router;
