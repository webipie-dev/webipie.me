const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = Schema({
        name: {type: String, required: true},
        description: {type: String, required: true},
        imgs: {type: [String], default: []},
        video: {type: String, required: false},
        skills: {type: [String], required: false},
        link: {type: String, required: false},
        github: {type: String, required: false},
        portfolio: {type: Schema.Types.ObjectID, ref: "Portfolio"}
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

module.exports.projectSchema = projectSchema;
module.exports.Project = mongoose.model('Project', projectSchema);
