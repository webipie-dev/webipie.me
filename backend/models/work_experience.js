const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workExperienceSchema = Schema({
    description: {type: String, required: false, default: ''},
    position: {type: String, required: false, default: ''},
    company: {type: String, required: false, default: ''},
    imgs: {type: [String], required: false, default: ''},
    tags: {type: [String], required: false, default: ''},
    skills: {type: [String], required: false, default: ''},
    date: {type: Date, required: false, default: ''},
    city: {type: String, required: false, default: ''},
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