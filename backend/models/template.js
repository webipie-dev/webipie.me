const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: all elements required
const templateSchema = new Schema({
  name: {type: String, unique: true},
  header: {
    img: { type: String },
    title: { type: String },
    description: { type: String },
    mainButton: { type: String }
  },
  colorChart: {type: {}, default: {}},
  colorChartOptions: {type: [{}], default: []},
  font: { type: String},
  fontOptions: { type: [String], default: []}
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


module.exports.templateSchema = templateSchema;
module.exports.Template = mongoose.model('Template', templateSchema);