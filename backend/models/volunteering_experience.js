const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: change service
const volunteeringExperienceSchema = Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    position: {type: String, required: false},
    organisation: {type: String, required: true},
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


module.exports.volunteeringExperienceSchem = volunteeringExperienceSchema;
module.exports.VolunteeringExperience = mongoose.model('VolunteeringExperience', volunteeringExperienceSchema);
