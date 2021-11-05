const yup = require('yup');
const _defaultsDeep = require('lodash/defaultsDeep');

const db = require('../../db/models');
const validationErrors = require('../validationErrors');
const { isNumberReg } = require('../utils');
const defaultQuery = require('./defaultQuery');

const ENGLISH_LEVELS = db.candidate.rawAttributes.english_level.values;

const getList = {
  query: {
    ...defaultQuery,
  },
};

const create = {
  body: {
    firstName: yup.string()
      .required(validationErrors.candidateFirstNameRequired)
      .trim(),
    lastName: yup.string(),
    social: yup.array(yup.string()),
    job_experience: yup.string(),
    repo: yup.array(yup.string()),
    english_level: yup.mixed().oneOf(
      ENGLISH_LEVELS,
      validationErrors.candidateEnglishLevelTypeInvalid,
    ),
    additional_info: yup.string(),
    army: yup.boolean(),
    studying: yup.boolean(),
    hr_id: yup.number().nullable(true),
    column_id: yup.number().nullable(true),
    technologies: yup.array(yup.number()),
  },
};

const update = _defaultsDeep({
  body: {
    firstName: yup.string().trim(),
  },
  params: {
    id: yup.string().required().matches(isNumberReg, validationErrors.invalidId),
  },
}, create);

const deleteOne = _defaultsDeep({
  params: {
    id: yup.string().required().matches(isNumberReg, validationErrors.invalidId),
  },
});

module.exports = {
  getList,
  create,
  update,
  deleteOne,
};
