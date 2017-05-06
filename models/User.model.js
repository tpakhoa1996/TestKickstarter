exports.displayName = "Brian Nguyen";

exports.tags = {};

exports.likeIdea = [];

exports.dislikeIdea = [];

exports.addWeight = (data) => {
	data.forEach((project, index) => {
		project.weight = 50;
		let extraWeight = 0;
		if (project.projectCategory) {
			let categoriesNum = 0;
			project.projectCategory.forEach((tag) => {
				extraWeight += 50;
				categoriesNum ++;
				if (tags.tag)
					extraWeight += tags.tag;
			});
			project.weight += Math.round(extraWeight / categoriesNum);
		}
		data[index] = project;
	});
	data.sort((u, v) => v.score - u.score);
	return data;
}

module.exports = exports;
