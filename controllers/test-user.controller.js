var User = require.main.require("./models/User.model.js");
var Project = require.main.require("./models/DProject.model.js");

const WEIGHT_PER_LIKE = 20;
const WEIGHT_PER_DISLIKE = -10;

exports.like = (req, res) => {
	let link = req.body.link;
	let project = Project.getByLink(link);
	project.projectCategory.forEach( (tag) => {
		if (User.tags.tag)
			User.tags.tag += WEIGHT_PER_LIKE;
		else
			User.tags.tag = WEIGHT_PER_LIKE;
	});
	let index = User.likeIdea.indexOf(link);
	if (index == -1)
		User.likeIdea.push(link);
	index = User.dislinkIdea.indexOf(link);
	if (index != -1)
		User.dislikeIdea.splice(index, 1);
};

exports.dislike = (req, res) => {
	let link = req.body.link;
	let project = Project.getByLink(link);
	project.projectCategory.forEach( (tag) => {
		if (User.tags.tag)
			User.tags.tag += WEIGHT_PER_DISLIKE;
		else
			User.tags.tag = WEIGHT_PER_DISLIKE;
	});
	let index = User.likeIdea.indexOf(link);
	if (index != -1)
		User.likeIdea.splice(index, 1);
	index = User.dislinkIdea.indexOf(link);
	if (index == -1)
		User.dislikeIdea.push(link);
};

exprots = exports;
