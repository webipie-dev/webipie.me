const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = Schema({
  name: {type: String, required: true},
  description: {type: String, required: false},
  imgs: {type: [String], required: false},
  tags: {type: [String], required: false},
  skills: {type: [String], required: false},
  date: {type: Date, required: false},
  link: {type: String, required: false},
  github: {type: String, required: false},
  portfolio: {type: Schema.Types.ObjectID, ref: "Portfolio"}

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

module.exports = mongoose.model('Project', projectSchema);
