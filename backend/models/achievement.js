const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
        description: {type: String, required: false},
        title: {type: String, required: true},
        image: {type: String, required: false},
        date: {type: Date, required: false},
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

module.exports.achievementSchema = achievementSchema;
module.exports.Achievement = mongoose.model('Achievement', achievementSchema);
