let tags = {};
let likeIdea = [];
let dislikeIdea = [];

exports.displayName = "Brian Nguyen";

exports.tags = tags;

exports.likeIdea = likeIdea;

exports.dislikeIdea = dislikeIdea;

exports.addWeight = (data) => {
	data.forEach((project, index) => {
		project.weight = 0;
		if (project.projectCategory.length > 0) {
			let categoriesNum = 0;
			project.projectCategory.forEach((tag) => {
				project.weight += 50;
				categoriesNum ++;
				if (tags[tag])
					project.weight += tags[tag];
			});
			project.weight = Math.round(project.weight / categoriesNum);
		}
		data[index] = project;
	});
	data.sort((u, v) => v.weight - u.weight);
	data.forEach((project) => {
		console.log(project.weight);
	});
	return data;
}

// Status: like | dislike
exports.addStatus = (data) => {
	data.forEach((project, index) => {
		let link = project.projectLink;
		if (likeIdea.indexOf(link) >= 0)
			project.status = 'like';
		if (dislikeIdea.indexOf(link) >= 0)
			project.status = 'dislike';
		data[index] = project;
	});
	return data;
};

module.exports = exports;
