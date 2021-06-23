const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const technicalSkillSchema = Schema({
  name: {type: String, required: true, default: ''},
  level: {type: Number, required: false, default: '', min: 0, max: 10},
  icon: {type: String, required: false, default: ''},
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