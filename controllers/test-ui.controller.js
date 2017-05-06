var data = require('/assets/data.json');

module.exports = {
    display: (request, response) => {
        response.render('test-ui', {
			nav: 'ui',
			data: data
		});
    }
}
