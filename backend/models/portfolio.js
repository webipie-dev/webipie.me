const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {templateSchema, templateInstanceSchema} = require('./template');
const { achievementSchema } = require('./achievement');
const { testimonialSchema } = require('./testimonial');
const {workExperienceSchema} = require('./work_experience');
const {volunteeringExperienceSchema} = require('./volunteering_experience');
const {projectSchema} = require('./project');
const {educationSchema} = require('./education');
const {softSkillSchema} = require('./soft_skill');
const {technicalSkillSchema} =  require('./technical_skill');
const {customSkillSchema} = require('./custom_skill');

const portfolioSchema = new Schema({
  url: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  userName: {type: String},
  description: {type: String, required: false},
  phoneNumber: {type: String, required: false},
  position: {type: String, required: false},
  picture: {type: String, required: false},
  email: {type: String, required: false},
  github: {type: String, required: false},
  linkedIn: {type: String, required: false},
  CV: {type: String, required: false},
  creationDate: {type: Date, default: Date.now()},
  template: templateInstanceSchema,
  projects: {type: [projectSchema]},
  education: {type: [educationSchema]},
  achievements: {type: [achievementSchema]},
  testimonials: {type: [testimonialSchema]},
  technicalSkills: [{
    skill: {type: technicalSkillSchema},
    level:{type: Number, required: false, min: 0, max: 10}
  }],
  customSkills: [{
    skill: {type: customSkillSchema},
    level:{type: Number, required: false, min: 0, max: 10}
  }],
  softSkills: {type: [softSkillSchema]},
  workExperiences: {type: [workExperienceSchema]},
  volunteeringExperiences: {type: [volunteeringExperienceSchema]},
  projectsDisabled: {type: Boolean, default: false},
  testimonialsDisabled: {type: Boolean, default: false},
  achievementsDisabled: {type: Boolean, default: false},
  educationDisabled: {type: Boolean, default: false},
  technicalSkillsDisabled: {type: Boolean, default: false},
  softSkillsDisabled: {type: Boolean, default: false},
  workExperiencesDisabled: {type: Boolean, default: false},
  volunteeringExperiencesDisabled: {type: Boolean, default: false},
  visits: {
    type: Map,
    of: {ip: String, date: Date, country: String, count: Number}
  },
  visitsPerDay: {
    type: Map,
    of: Number
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
