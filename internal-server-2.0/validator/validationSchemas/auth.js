const yup = require('yup');

const validationErrors = require('../validationErrors');

const signUp = {
  body: {
    email: yup.string()
      .required(validationErrors.emailRequired)
      .trim()
      .email(validationErrors.emailInvalid),
    login: yup.string().required(validationErrors.loginRequired).trim(),
    phone: yup.string().required(validationErrors.phoneRequired).trim(),
    password: yup.string()
      .required(validationErrors.passwordRequired)
      .trim()
      .min(3, validationErrors.passwordTooShort)
      .max(50, validationErrors.passwordTooLong),
  },
};

module.exports = {
  signUp,
};
