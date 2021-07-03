const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const templateSchema = new Schema({
    id: {type: Schema.Types.ObjectID, ref: "Template"},
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
});


module.exports.templateSchema = templateSchema;
module.exports.Template = mongoose.model('Template', templateSchema);