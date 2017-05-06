var Project = require.main.require('./models/DProject.model.js'),
	User = require.main.require('./models/User.model.js');

module.exports = {
    display: (request, response) => {
		let data = User.addWeight(Project.projects);
		data = User.addStatus(data);
		data.forEach((project) => {
			console.log(project.status);
		});
        response.render('test-ui', {
			nav: 'ui',
			data: data
		});
    }
}
