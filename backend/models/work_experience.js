const mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
const experienceSchema = require('./experience');

const workExperienceSchema = experienceSchema.extend({
    company: {type: String, required: false, default: ''},
});

module.exports = mongoose.model('WorkExperience', workExperienceSchema);