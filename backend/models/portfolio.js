const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const templateSchema = require('./template');


const portfolioSchema = new Schema({
  phoneNumber: {type: String, required: true, unique: true},
  github: {type: String, required: false, unique: true},
  linkedin: {type: String, required: false, unique: true},
  CV: {type: String, required: false, unique: true},
  creationDate: {type: Date, default: Date.now()},
  template: templateSchema

},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  });

module.exports = mongoose.model('Portfolio', portfolioSchema);
