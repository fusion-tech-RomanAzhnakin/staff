const yup = require('yup');

// const db = require('../../db/models');
const validationErrors = require('../validationErrors');
const defaultQuery = require('./defaultQuery');
const { isNumberReg } = require('../utils');

// const USER_ROLES = db.user.rawAttributes.role.values;

const getList = {
  query: {
    ...defaultQuery,
    filter: yup.object().shape({
      role: yup.array(), // .oneOf(USER_ROLES, validationErrors.userRoleInvalid),
      techRole: yup.array(),
      status: yup.array(),
      isDev: yup.boolean(),
      search: yup.string(),
    }),
  },
};

const getOne = {
  params: {
    id: yup.string().matches(isNumberReg, validationErrors.invalidId),
  },
};

const update = {
  body: {
    login: yup.string().required(validationErrors.loginRequired).trim(),
    phone: yup.string().required(validationErrors.phoneRequired).trim(),
    email: yup
      .string()
      .required(validationErrors.emailRequired)
      .trim()
      .email(validationErrors.emailInvalid),
    firstName: yup.string(),
    firstName_ru: yup.string(),
    slake_name: yup.string(),
    lastName: yup.string(),
    lastName_ru: yup.string(),
    education: yup.string(),
    education_ru: yup.string(),
    info: yup.string(),
    repo: yup.array().of(yup.string().url()),
    DoB: yup.date().nullable(),
  },
  params: {
    id: yup.string().matches(isNumberReg, validationErrors.invalidId),
  },
};

const changePassword = {
  body: {
    password: yup
      .string()
      .required(validationErrors.passwordRequired)
      .trim()
      .min(3, validationErrors.passwordTooShort)
      .max(50, validationErrors.passwordTooLong),
    oldPassword: yup.string(),
  },
  params: {
    id: yup.string().matches(isNumberReg, validationErrors.invalidId),
  },
};

module.exports = {
  getList,
  getOne,
  update,
  changePassword,
};
