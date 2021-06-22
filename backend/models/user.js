const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { string, boolean } = require('joi');

const userSchema = new Schema({
  methods: {
    type: [String],
    required: true,
    default: []
  },
  local: {
    name: { type: String, default: '' },
    email: { type: String, lowercase: true, default: '' },
    password: { type: String, default: '' },
    verified: { type: Boolean, default: false }
  },
  google: {
    id: { type: String, default: '' },
    email: { type: String, lowercase: true, default: '' }
  },
  facebook: {
    id: { type: String, default: '' },
    email: { type: String, lowercase: true, default: '' }
  },
  portfolioID: {
    type: [Schema.Types.ObjectID],
    ref: "portfolio",
    required: false
  },
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

userSchema.pre('save' , async function(next){
    try {
      if (!this.methods.includes('local')) {
        next();
      }

      //the user schema is instantiated
      const user = this;
      //check if the storeOwner has been modified to know if the password has already been hashed
      if (!user.isModified('local.password')) {
        next();
      }

      const salt = await bcrypt.genSalt(10);
      this.local.password = await bcrypt.hash(this.local.password, salt);
      next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
}

const User = mongoose.model('user' , userSchema);


function validateuser(user) {

    schemas = {
        authSchema: Joi.object().keys({
          name: Joi.string().min(5),
          email: Joi.string().email({minDomainSegments: 2}).required(),
          password: Joi.string().required().min(5)
        })
    }


    return schemas['authSchema'].validate(user);
}


module.exports.validateuser = validateuser;
module.exports.User = User;
