let data = require("./data.json");

exports.projects = data;

exports.getByLink = (link) => {
	let resProject;
	data.forEach( (project) => {
		if (project.projectLink == link) {
			resProject = project;
			return false;
		}
	});
	return resProject;
}
