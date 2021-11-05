import { string as yupString } from 'yup';

import validationErrors from 'utils/validationErrors';

export const loginValidation = yupString()
  .required(validationErrors.requiredLogin)
  .min(3, validationErrors.shortLogin)
  .max(50, validationErrors.longLogin);

export const phoneValidation = yupString()
  .required(validationErrors.requiredPhone);

export const passwordValidation = yupString()
  .required(validationErrors.requiredPassword)
  .min(6, validationErrors.shortPassword)
  .max(50, validationErrors.shortPassword);

export const emailValidation = yupString()
  .required(validationErrors.requiredEmail)
  .email(validationErrors.invalidEmail);

export default {
  email: emailValidation,
  login: loginValidation,
  phone: phoneValidation,
  password: passwordValidation,
};
