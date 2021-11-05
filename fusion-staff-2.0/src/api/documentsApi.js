import axios from './axios';

const path = '/documents';

/**
 * @param {[
  * {
      title: string;
      description: string;
      description_ru: string;
      role: Array<JSON>;
      technologies: Array<Object>;
  * }
  ]} data
 */
export const createPortfolio = (data) => {
  return axios.post(
    `${path}/portfolio`,
    data,
    {
      responseType: 'blob',
    },
  )
    .then((res) => {
      return window.URL.createObjectURL(
        new Blob([res], { type: 'application/pdf' }),
      );
    });
};
