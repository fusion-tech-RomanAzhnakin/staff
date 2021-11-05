const { StatusCodes } = require('http-status-codes');
const yup = require('yup');

const errorHandler = require('../utils/errorHandler');
const { validationErrorName } = require('../utils/constants');

const validator = (shape) => {
  return async (req, res, next) => {
    try {
      const reqFields = Object.keys(shape);

      for (let i = 0; i < reqFields.length; i++) {
        const key = reqFields[i];

        // eslint-disable-next-line no-await-in-loop
        await yup
          .object()
          .shape(shape[key])
          .validate(req[key], { abortEarly: false });
      }

      next();
    } catch (err) {
      if (err.name !== validationErrorName) {
        err.functionName = validator.name;
        err.fileName = __filename;
        return errorHandler(err, req, res, next);
      }

      const errors = [];
      err.inner.forEach((error) => {
        errors.push({
          path: error.path,
          message: error.message,
        });
      });

      res.status(StatusCodes.BAD_REQUEST).json({
        name: validationErrorName,
        errors,
      });
    }
  };
};

module.exports = validator;
