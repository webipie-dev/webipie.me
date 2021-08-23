const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = Schema({
    title: {type: String, required: true},
    level: {type: String, required: false},
    beginDate: {type: Date, required: true},
    endDate: {type: Date, required: false},
    city: {type: String, required: false},
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
    

module.exports.educationSchema = educationSchema;
module.exports.Education = mongoose.model('Education', educationSchema);