const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helper');

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
const emailSchema = Joi.object({
  email: Joi.string().required(),
});

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: String,
  avatarUrl: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
});

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = { User, registerSchema, emailSchema };
