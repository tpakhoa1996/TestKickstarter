var webdriver = require('selenium-webdriver'),
	By = webdriver.By,
	cheerio = require('cheerio'),
	sleep = require('sleep'),
	url = require('url'),
	kickstarter = require('./retrieveProject.js');

// Init crawling
var Crawler = require('crawler');

crawler = new Crawler({
	rateLimit: 500,
	maxConnections: 10,
	callback: (err, res, done) => {
		//console.log("Start getting data");
		if (err) {
			console.log("Getting CRAWLING error");
		} else {
			//console.log("Getting data");
			let data = kickstarter.retrieveData(res);
			let urlOb = res.request.uri;
			let projectLink = 'https://' + urlOb.host + urlOb.pathname;
			data.projectLink = projectLink;
			console.log(JSON.stringify(data));
			console.log(',');
		}
		done();
	}
});

// Selenium crawling
var driver = new webdriver.Builder()
    .forBrowser('phantomjs')
    .build();

driver.get('https://www.kickstarter.com/discover/advanced?sort=newest');

let allData = [];

driver.getPageSource().then((page) => {
	console.log("Ok");
	let	$ = cheerio.load(page);
	$('.project-title a').toArray().forEach((elem) => {
		let projectLink = elem.attribs.href;
		let urlOb = url.parse(projectLink);
		projectLink = "https://www.kickstarter.com" + urlOb.pathname;
		console.log(projectLink);
	});;
	driver.findElement(By.css('.load_more a')).click().then(() => {
		console.log("Succ click");
	});
	let loadElement = () => {
		console.log("Hello world");
		sleep.sleep(1);
		driver.findElement(By.css('.load_more a')).click().then(loadElement)
		.catch((err) => {
			if (!err)
				return;
			driver.getPageSource().then( (page) => {
				$ = cheerio.load(page);
				$('.project-title a').toArray().forEach((elem) => {
					let projectLink = elem.attribs.href;
					let urlOb = url.parse(projectLink);
					projectLink = "https://kickstarter.com" + urlOb.pathname;
					console.log(projectLink);
					// Queueing crawler
					crawler.queue(projectLink);
					//===================================
				});
			});
		});
	};
	loadElement();
});
driver.quit();
