const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const templateSchema = new Schema({
    id: {type: Schema.Types.ObjectID, ref: "Template"},
    name: {type: String, default: ''},
    header: {
      img: { type: String, default: '' },
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      mainButton: { type: String, default: '' }
    },
    colorChart: {type: {}, default: {}},
    colorChartOptions: {type: [{}], default: []},
    font: { type: String, default: ''},
    fontOptions: { type: [String], default: []}
});


module.exports.templateSchema = templateSchema;
module.exports.Template = mongoose.model('Template', templateSchema);