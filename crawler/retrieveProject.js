var crawler = require('crawler');

module.exports.getUrl = function (data) {
	var url = 'https://www.kickstarter.com/projects/';
	return url + data.creator + '/' + data.code;
}

module.exports.crawler = new crawler({
	rateLimit: 500,
	maxConnections: 10
});

module.exports.retrieveData = function(res) {
	var data = {};
	var $ = res.$;
	var money = $('.money').toArray();
	data.goal = money[1].children[0].data;
	return data;
};
