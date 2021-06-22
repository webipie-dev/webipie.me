const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = Schema({
  name: {type: String, required: true, default: ''},
  description: {type: String, required: false, default: ''},
  imgs: {type: [String], required: false, default: ''},
  tags: {type: [String], required: false, default: ''},
  skills: {type: [String], required: false, default: ''},
  date: {type: Date, required: false, default: ''},
  link: {type: String, required: false, default: ''},
  github: {type: String, required: false, default: ''},
  portfolio: {type: Schema.Types.ObjectID, ref: "Portfolio", default: ''}

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
