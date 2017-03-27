//TODO: clean up the code
var crawler = require('crawler');

var map_currency = {"AED":"AED","AFN":"؋","ALL":"Lek","AMD":"AMD","AOA":"AOA","ARS":"$","EUR":"€","AUD":"AU$ ","AWG":"ƒ","AZN":"ман","BAM":"KM","BBD":"$","BDT":"BDT","BGN":"лв","BHD":"BHD","BIF":"BIF","BMD":"$","BND":"$","BOB":"$b","BRL":"R$","BSD":"$","BTN":"BTN","BWP":"P","BYR":"p.","BZD":"BZ$","CAD":"CA$ ","CDF":"CDF","CHF":"CHF ","CLP":"$","CNY":"¥","COP":"$","CRC":"₡","CUP":"₱","CVE":"CVE","CZK":"Kč","DJF":"DJF","DKK":"DKK ","DOP":"RD$","DZD":"DZD","EGP":"£","ERN":"ERN","ETB":"ETB","FJD":"$","FKP":"£","GBP":"£","GEL":"GEL","GHS":"GHS","GIP":"£","GMD":"GMD","GNF":"GNF","GTQ":"Q","GYD":"$","HKD":"HK$ ","HNL":"L","HRK":"kn","HTG":"HTG","HUF":"Ft","IDR":"Rp","ILS":"₪","INR":"INR","IQD":"IQD","IRR":"﷼","ISK":"kr","JMD":"J$","JOD":"JOD","JPY":"¥","KES":"KES","KGS":"лв","KHR":"៛","KMF":"KMF","KPW":"₩","KRW":"₩","KWD":"KWD","KYD":"$","KZT":"лв","LAK":"₭","LBP":"£","LKR":"₨","LRD":"$","LSL":"LSL","LTL":"Lt","LVL":"Ls","LYD":"LYD","MAD":"MAD","MDL":"MDL","MGA":"MGA","MKD":"ден","MMK":"MMK","MNT":"₮","MOP":"MOP","MRO":"MRO","MUR":"₨","MVR":"MVR","MWK":"MWK","MXN":"MX$ ","MYR":"RM","MZN":"MT","NAD":"$","NGN":"₦","NIO":"C$","NOK":"NOK ","NPR":"₨","NZD":"NZ$ ","OMR":"﷼","PAB":"B/.","PEN":"S/.","PGK":"PGK","PHP":"₱","PKR":"₨","PLN":"zł","PYG":"Gs","QAR":"﷼","RON":"lei","RSD":"Дин.","RUB":"руб","RWF":"RWF","SAR":"﷼","SBD":"$","SCR":"₨","SDG":"SDG","SEK":"SEK ","SGD":"S$ ","SHP":"£","SLL":"SLL","SOS":"S","SRD":"$","SSP":"SSP","STD":"STD","SVC":"$","SYP":"£","SZL":"SZL","THB":"฿","TJS":"TJS","TMT":"TMT","TND":"TND","TOP":"TOP","TRY":"TL","TTD":"TT$","TWD":"NT$","TZS":"TZS","UAH":"₴","UGX":"UGX","USD":"$","UYU":"$U","UZS":"лв","VEF":"Bs","VND":"₫","VUV":"VUV","WST":"WST","YER":"﷼","ZAR":"R","ZMK":"ZMK","ZWL":"ZWL"};

module.exports.getUrl = function (data) {
	var url = 'https://www.kickstarter.com/projects/';
	return url + data.creator + '/' + data.code;
}

module.exports.crawler = new crawler({
	rateLimit: 500,
	maxConnections: 10
});

// Crawling data:
// status: live | successful | failed
// title
// creator
// posters
// backers_number
// images: contains links of images in project description
// goal
// pledged
// currency: notation of currency used in the project
// description
// category

module.exports.retrieveData = function(res) {
	var data = {};
	var $ = res.$;
	data.status = $("#main_content").attr("class").slice(15);
	if (data.status != 'successful') {
		data.goal = $("#pledged").attr('data-goal');
		data.pledged = $("#pledged").attr('data-pledged');
		var tmp = $("span.project_currency_code");
		tmp.removeClass('money');
		tmp.removeClass('project_currency_code');
		data.currency = map_currency[tmp.attr('class').toUpperCase()];
		data.title = $("h2.navy-700").text();
		data.backers_number = $("#backers_count").attr("data-backers-count");
		data.completion_date = $("[data-end_time]").attr("data-end_time");
	} else {
		var tmp = $(".money");
		data.pledged = tmp.eq(1).text();
		data.goal = tmp.eq(2).text();
		data.currency = data.goal[0];
		if ('0' <= data.currency && data.currency <= '9')
			data.currency = data.goal.slice(-1);
		data.goal = data.goal.replace(/\D/g, '');
		data.pledged = data.pledged.replace(/\D/g, '');
		data.backers_number = $("div.mb0 h3").text().replace(/\D/g, '');
		data.title = $(".NS_project_profile__title .hero__link").text();
	}
	data.creator = $("a[data-modal-class='modal_project_by']:only-child").text().replace(/\n/g, '');
	data.poster = $("img.poster").attr('src');
	data.images = []
	$(".full-description img").each(function(index, element) {
		data.images.push($(element).attr('src'));
	});
	data.description = $(".full-description").html();
	data.category = $("div.NS_projects__category_location a").eq(1).text().replace(/\n/g, "");
	data.title = data.title.slice(0, data.title.length >> 1).replace(/\n/g, '');
	return data;
};
