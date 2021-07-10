const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const technicalSkillSchema = Schema({
  name: {type: String, required: true},
  icon: {type: String, required: false},
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

module.exports = mongoose.model('TechnicalSkill', technicalSkillSchema);