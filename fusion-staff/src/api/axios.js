import axios from 'axios';
import config from '../config';
import { headers } from './apiConfig';
import followRedirects from 'follow-redirects';

const BODY_SIZE = 100 * 1024 * 1024; // 100 MB
followRedirects.maxBodyLength = BODY_SIZE;

const axiosWrapper = async (data) => {
  try {
    const res = await axios({
      ...data,
      url: `${config.url}${data.url}`,
      headers: {
        ...headers(),
        ...data.headers
      },
      maxContentLength: BODY_SIZE,
      maxBodyLength: BODY_SIZE,
    });

    return res;
  } catch (err) {
    if (err.response && err.response.status) {
      const status = err.response.status;
      if (status === 418) {
        // console.log('НЕТ ДОСТУПА!!!');
        window.location.replace('/home');
      }
      if (status === 406) {
        // console.log('ПАРШИВЫЙ ТОКЕН!!!');
        document.cookie = `${config.token_name}=; path=/; domain=${config.domain};`;

        window.location.replace('/home');
      }
    }

    throw err;
  }
};

// / 406 - нет пользователя в БД или сломанный токен
// / 418 - ошибка доступа

export default axiosWrapper;
