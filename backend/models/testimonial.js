const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    name: {type: String},
    position: {type: String},
    photo: {type: String},
    description: {type: String},
    portfolio: {type: Schema.Types.ObjectID, ref: "Portfolio"}
});

module.exports.testimonialSchema = testimonialSchema;
module.exports.Testimonial = mongoose.model('Testimonial', testimonialSchema);