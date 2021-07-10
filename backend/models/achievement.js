const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
    description: {type: String, default: ''},
    title: {type: String, default: ''},
    portfolio: {type: Schema.Types.ObjectID, ref: "Portfolio"}
});

module.exports.achievementSchema = achievementSchema;
module.exports.Achievement = mongoose.model('Achievement', achievementSchema);