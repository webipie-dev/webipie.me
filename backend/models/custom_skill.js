const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customSkillSchema = Schema({
  name: {type: String, required: true},
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

module.exports.customSkillSchema = customSkillSchema;
module.exports.CustomSkill = mongoose.model('CustomSkill', customSkillSchema);