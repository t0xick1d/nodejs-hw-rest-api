const Joi = require('joi');

const schema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).required(),
});

module.exports = { schema };
