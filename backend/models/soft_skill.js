const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const softSkillSchema = Schema({
  title: {type: String, required: true, default: ''},
  description: {type: String, required: false, default: ''},
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

module.exports = mongoose.model('SoftSkill', softSkillSchema);