const yup = require('yup');

const db = require('../../db/models');
const validationErrors = require('../validationErrors');
const defaultQuery = require('./defaultQuery');

const REQUEST_TYPES = db.request.rawAttributes.type.values;

const create = {
  body: {
    title: yup.string().required(validationErrors.requestTitleRequired),
    type: yup.mixed().oneOf(REQUEST_TYPES, validationErrors.requestTypeInvalid),
    dateFrom: yup.date(),
    dateTo: yup.date().when('dateFrom', (dateFrom, schema) => (dateFrom && schema.min(dateFrom, validationErrors.requestDatesRangeError))),
    dates: yup.array().of(yup.date()),
    comment: yup.string(),
    rest_days_number: yup.number(),
    userId: yup.number(),
  },
};

const getList = {
  query: {
    ...defaultQuery,
  },
};

module.exports = {
  create,
  getList,
};
