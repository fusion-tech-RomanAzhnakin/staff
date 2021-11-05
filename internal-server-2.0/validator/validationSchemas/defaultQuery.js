const yup = require('yup');

const validationErrors = require('../validationErrors');
const { isNumberReg } = require('../utils');

const defaultQuery = {
  perPage: yup.string().matches(isNumberReg, validationErrors.invalidPageValue),
  page: yup.string().matches(isNumberReg, validationErrors.invalidPerPageValue),
  sortBy: yup.string(),
  sortDirection: yup.mixed().oneOf(['straight', 'reverse'], validationErrors.invalidSortDirection),
};

module.exports = defaultQuery;
