const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workExperienceSchema = Schema({
    description: {type: String, required: false},
    position: {type: String, required: false},
    company: {type: String, required: false},
    imgs: {type: [String], required: false},
    tags: {type: [String], required: false},
    skills: {type: [String], required: false},
    date: {type: Date, required: false},
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