const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: change service 
const workExperienceSchema = Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    position: {type: String, required: false},
    company: {type: String, required: false},
    imgs: {type: [String], required: false},
    tags: {type: [String], required: false},
    skills: {type: [String], required: false},
    beginDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    city: {type: String, required: false},
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
    

module.exports.workExperienceSchema = workExperienceSchema;
module.exports.WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);
