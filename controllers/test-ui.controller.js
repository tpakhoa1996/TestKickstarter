var data = require('../public/data/data.json');

module.exports = {
    display: (request, response) => {
        response.render('test-ui', {
			nav: 'ui',
			data: data
		});
    }
}
