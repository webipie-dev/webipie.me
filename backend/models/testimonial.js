const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    name: {type: String, required: true},
    position: {type: String, required: false},
    photo: {type: String, required: false},
    description: {type: String, required: true},
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
    });

module.exports.testimonialSchema = testimonialSchema;
module.exports.Testimonial = mongoose.model('Testimonial', testimonialSchema);
