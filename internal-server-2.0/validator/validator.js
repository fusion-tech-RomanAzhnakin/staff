const yup = require('yup');
const auth = require('./validationSchemas/auth');
const request = require('./validationSchemas/request');
const candidate = require('./validationSchemas/candidate');
const user = require('./validationSchemas/user');
const technology = require('./validationSchemas/technology');
const candidateColumns = require('./validationSchemas/candidateColumns');
const validationErrors = require('./validationErrors');
const db = require('../db/models');

const signUp = {
  body: {
    email: yup.string()
      .required(validationErrors.emailRequired)
      .trim()
      .email(validationErrors.emailInvalid),
    login: yup.string().required(validationErrors.loginRequired).trim(),
    password: yup.string()
      .required(validationErrors.passwordRequired)
      .trim()
      .min(3, validationErrors.passwordTooShort)
      .max(50, validationErrors.passwordTooLong),
  },
};

const createRequest = {
  body: {
    title: yup.string().required(validationErrors.requestTitleRequired),
    type: yup.mixed().oneOf(db.request.rawAttributes.type.values,
      validationErrors.requestTypeInvalid),
    dateFrom: yup.date(),
    dateTo: yup.date().when('dateFrom', (dateFrom, schema) => (dateFrom && schema.min(dateFrom, validationErrors.requestDatesRangeError))),
    dates: yup.array().of(yup.date()),
    comment: yup.string(),
    rest_days_number: yup.number(),
    userId: yup.number(),
  },
};

module.exports = {
  auth,
  request,
  candidate,
  user,
  technology,
  candidateColumns,
  signUp,
  createRequest,
};
