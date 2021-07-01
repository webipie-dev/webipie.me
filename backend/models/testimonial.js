const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    name: {type: String, default: ''},
    position: {type: String, default: ''},
    photo: {type: String, default: ''},
    description: {type: String, default: ''},
    portfolio: {type: Schema.Types.ObjectID, ref: "Portfolio"}
});

module.exports.testimonialSchema = testimonialSchema;
module.exports.Testimonial = mongoose.model('Testimonial', testimonialSchema);