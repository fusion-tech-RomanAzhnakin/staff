import axios from 'axios';

import config from 'config';
import tokenUtil from 'utils/token';
import { logOut } from 'utils';

const customAxios = axios.create({
  baseURL: config.apiUrl,
  // TO-DO: Return when we will have a cookie authorization
  // withCredentials: true,
});

export const setToken = (token) => {
  customAxios.defaults.headers.Authorization = `Bearer ${token}`;
};

customAxios.defaults.headers.app_id = config.appId;
setToken(tokenUtil.access.get());

customAxios.interceptors.request.use((request) => {
  // TO-DO: Return when we will have a device check
  // request.headers.device = '';
  return request;
});

customAxios.interceptors.response.use(
  ({ data }) => data,
  async (err) => {
    if (err?.response?.data === 'expired') {
      if (!refreshPromise) {
        refreshPromise = refreshToken();
      }
      const isReseted = await refreshPromise;

      if (!isReseted) {
        throw err;
      }
      const request = err.config;

      request.headers.Authorization = `Bearer ${tokenUtil.access.get()}`;

      return customAxios(request);
    }

    return Promise.reject(err.response);
  },
);

let refreshPromise = null;
const refreshToken = async () => {
  try {
    const { data } = await axios.post(`${config.apiUrl}/auth/refresh`, { token: tokenUtil.refresh.get() });

    tokenUtil.access.set(data.access);
    tokenUtil.refresh.set(data.refresh);

    setToken(data.access);

    return true;
  } catch (err) {
    logOut();
    return false;
  } finally {
    refreshPromise = null;
  }
};

export default customAxios;
