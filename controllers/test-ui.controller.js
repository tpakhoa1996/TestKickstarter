var Project = require.main.require('./models/DProject.model.js'),
	User = require.main.require('./models/User.model.js');

module.exports = {
    display: (request, response) => {
        response.render('test-ui', {
			nav: 'ui',
			data: User.addWeight(Project.projects),
		});
    }
}
