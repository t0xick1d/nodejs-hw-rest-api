const { Schema, model } = require('mongoose');
const Joi = require('joi');

const schema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).required(),
});

module.exports = { schema };

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model('contact', contactSchema);

module.export = Contact;
