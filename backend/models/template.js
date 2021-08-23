const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: all elements required
const templateSchema = new Schema({
    name: {type: String, unique: true},
    colorChart: {type: {}, default: {}},
    colorChartOptions: {type: [{}], default: []},
    font: {type: String},
    fontOptions: {type: [String], default: []},
    general: {
        buttons: {
            shape: {
                type: String,
                enum: ['square', 'round'],
                default: 'square'
            },
            style: {
                type: String,
                enum: ['solid', 'outlined'],
                default: 'solid'
            },
            size: {
                type: String,
                enum: ['small', 'normal', 'big'],
                default: 'normal'
            }
        },
        picture: {
            type: String,
            enum: ['square', 'rounded'],
            default: 'rounded'
        },
        animationSpeed: {
            type: Number,
            min: 1,
            max: 10,
            default: 5
        }
    },
    softSkills: {
        type: Number,
        enum: [1, 2, 3],
        default: 1
    },
    hardSkills: {
        type: Number,
        enum: [1, 2, 3],
        default: 1
    },
    testimonials: {
        picture: {
            type: String,
            enum: ['square', 'rounded'],
            default: 'square'
        },
        textAlign: {
            type: String,
            enum: ['right', 'center'],
            default: 'center'
        },
        carouselSpeed: {
            type: Number,
            min: 1,
            max: 10,
            default: 5
        }
    },
    experience: {
        dateContainer: {
            type: Number,
            enum: [1, 2, 3],
            default: 1
        },
        dividerIcon: {
            type: Number,
            enum: [1, 2, 3],
            default: 2
        }
    },
    education: {
            dateContainer: {
                type: Number,
                enum: [1, 2, 3],
                default: 3
            },
            dividerIcon: {
                type: Number,
                enum: [1, 2, 3],
                default: 1
            }
        },
    achievement: {
            dateContainer: {
                type: Number,
                enum: [1, 2, 3],
                default: 2
            },
            dividerIcon: {
                type: Number,
                enum: [1, 2, 3],
                default: 3
            }
        },
    project: {
        button: {
            type: Number,
            enum: [1, 2],
            default: 1
        },
        popupCard: {
            type: Number,
            enum: [1, 2],
            default: 2
        }
    },
    contact: {
        socialMediaIcon: {
            type: Number,
            enum: [1, 2],
            default: 1
        },
        contactCard: {
            type: Number,
            enum: [1, 2],
            default: 2
        }
    }
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
