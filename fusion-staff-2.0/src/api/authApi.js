import axios, { setToken } from 'api/axios';
import token from 'utils/token';

const path = '/auth';

const tokenResponseHandler = ({ access, refresh, user }) => {
  token.access.set(access);
  token.refresh.set(refresh);

  setToken(access);

  return user;
};

/**
 * @param {{
    username: string;
    password: string;
 * }} data
 */
export const signIn = (data) => {
  return axios.post(`${path}/sign-in`, data).then(tokenResponseHandler);
};

/**
 * @param {{
    email: string;
    login: string;
    password: string;
 * }} data
 */
export const signUp = (data) => {
  return axios.post(`${path}/sign-up`, data).then(tokenResponseHandler);
};

export const forgotPassword = (email) => {
  return axios.post(`${path}/password-restore`, { email });
};

export const resetPassword = (data) => {
  return axios.post(`${path}/password-reset`, data);
};

export const check = () => {
  if (!token.access.get()) { return; }

  return axios.get(`${path}/me`);
};

export const signOut = () => {
  return axios.post(`${path}/logout`);
};

export default {
  signIn,
  signUp,
  check,
  signOut,
};
