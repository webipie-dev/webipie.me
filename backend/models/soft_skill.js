const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const softSkillSchema = Schema({
  title: {type: String, required: true},
  description: {type: String, required: false},
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

module.exports.softSkillSchema = softSkillSchema;
module.exports.SoftSkill = mongoose.model('SoftSkill', softSkillSchema);