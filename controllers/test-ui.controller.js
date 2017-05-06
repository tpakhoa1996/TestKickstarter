module.exports = {
    display: (request, response) => {
        response.render('test-ui', {
			nav: 'ui',
			data: ''
		});
    }
}
