const mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
const experienceSchema = require('./experience');

const volunteeringExperienceSchema = experienceSchema.extend({
    organisation: {type: String, required: false, default: ''},
});

module.exports = mongoose.model('VolunteeringExperience', volunteeringExperienceSchema);