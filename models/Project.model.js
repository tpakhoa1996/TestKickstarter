var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	SchemaType = mongoose.SchemaType;

class StatusType extends SchemaType {
	constructor(key, options) {
		super(key, options, 'StatusType');
	}

	cast(data) {
		data = String(data);
		if (['successful', 'live', 'failed'].includes(data))
			return data;
		throw new Error('StatusType: ' + data + 'is not in right format');
	}
}

mongoose.Schema.Types.StatusType = StatusType;

var projectSchema = new Schema({
	projectStatus: StatusType,
	projectTitle: String,
	projectCreator: String,
	projectLink: String,
	projectPoster: String,
	projectBackerNum: Number,
	projectImages: [String],
	projectGoal: Number,
	projectPledged: Number,
	projectCurrency: String,
	projectDescription: String,
	projectCategory: [String],
	projectCreatedDate: { type: Date, default: Date.now },
	projectCompletionDate: Date
});

module.exports = mongoose.model('Project', projectSchema);
