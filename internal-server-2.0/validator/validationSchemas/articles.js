const yup = require('yup');

const defaultQuery = require('./defaultQuery');
const validationErrors = require('../validationErrors');
const { isNumberReg } = require('../utils');

const create = {
  body: {
    link: yup.string().url(validationErrors.articleInvalidLink)
      .required(validationErrors.articleLinkRequired),
    tags: yup.array().of(yup.number()).required(validationErrors.articleTagsFieldRequired),
  },
};

const getList = {
  query: {
    ...defaultQuery,
  },
};

const getFilteredIdList = {
  query: {
    ...defaultQuery,
    filter: yup.object().shape({
      search: yup.string(),
      added_by: yup.array().of(yup.number()),
      tags_id: yup.array().of(yup.number()),
    }),
  },
};

const deleteOne = {
  params: {
    id: yup.string().required().matches(isNumberReg, validationErrors.invalidId),
  },
};

module.exports = {
  create,
  getList,
  getFilteredIdList,
  deleteOne,
};
