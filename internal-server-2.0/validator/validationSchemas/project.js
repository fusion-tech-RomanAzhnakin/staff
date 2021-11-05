const yup = require('yup');

const validationErrors = require('../validationErrors');
const defaultQuery = require('./defaultQuery');

const create = {
  body: {
    title: yup.string().required(validationErrors.projectTitle),
    href: yup.string().url(validationErrors.projectUrl),
  },
};

const getList = {
  query: {
    ...defaultQuery,
    include: yup.array().of(
      yup.object().shape({
        model: yup.string(),
        as: yup.string(),
        attributes: yup.array().of(yup.string()),
      }),
    ),
  },
};

module.exports = {
  create,
  getList,
};
