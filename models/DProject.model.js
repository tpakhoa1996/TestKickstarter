let data = require("./data.json");

exports.getByLink = (link) => {
	let resProject;
	data.forEach( (project) => {
		resProject = project;
		if (project.projectLink == link)
			return false;
	});
	return resProject;
}
