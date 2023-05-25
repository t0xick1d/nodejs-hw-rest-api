const { HttpError } = require('../helper');

const validateBody = (shema) => {
  const func = (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error && req.method === 'POST') {
      next(HttpError(400));
    }
    if (error && req.method === 'PUT') {
      next(HttpError(400, 'missing fields'));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
