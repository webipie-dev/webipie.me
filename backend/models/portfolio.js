const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {templateSchema} = require('./template');
const { achievementSchema } = require('./achievement');
const { testimonialSchema } = require('./testimonial');

const portfolioSchema = new Schema({
  url: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  description: {type: String, required: false},
  phoneNumber: {type: String, required: false},
  github: {type: String, required: false, unique: true},
  linkedIn: {type: String, required: false, unique: true},
  CV: {type: String, required: false, unique: true},
  creationDate: {type: Date, default: Date.now()},
  template: templateSchema,
  projects: {type: [Schema.Types.ObjectID], ref: "Porject"},
  achievements: {type: [achievementSchema]},
  testimonials: {type: [testimonialSchema]},
  technicalSkills: [{
    skill: {type: Schema.Types.ObjectID, ref: "TechnicalSkill"},
    level:{type: Number, required: false, min: 0, max: 10}
  }],
  softSkills: {type: [Schema.Types.ObjectID], ref: "SoftSkill"},
  workExperiences: {type: [Schema.Types.ObjectID], ref: "WorkExperience"},
  volunteeringExperiences: {type: [Schema.Types.ObjectID], ref: "VolunteeringExperience"},
  visits: {
    type: Map,
    of: {ip: String, date: Date, country: String, count: Number}
  }
},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  });

module.exports = mongoose.model('Portfolio', portfolioSchema);
