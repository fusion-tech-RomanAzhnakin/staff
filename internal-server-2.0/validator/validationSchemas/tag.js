const yup = require('yup');

const defaultQuery = require('./defaultQuery');
const validationErrors = require('../validationErrors');
const { isNumberReg } = require('../utils');

const create = {
  body: {
    title: yup.string().required(validationErrors.tagRequired),
  },
};

const getAll = {
  query: {
    ...defaultQuery,
  },
};

const getOne = {
  params: {
    id: yup.string().required().matches(isNumberReg, validationErrors.invalidId),
  },
};

const update = {
  body: {
    title: yup.string().required(validationErrors.tagRequired),
  },
  params: {
    id: yup.string().required().matches(isNumberReg, validationErrors.invalidId),
  },
};

const deleteOne = {
  params: {
    id: yup.string().required().matches(isNumberReg, validationErrors.invalidId),
  },
};

module.exports = {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
};
