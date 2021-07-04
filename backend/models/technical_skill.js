const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// TODO : seperate name and icon
const technicalSkillSchema = Schema({
  name: {type: String, required: true},
  level: {type: Number, required: false, min: 0, max: 10},
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