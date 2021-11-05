import localeRu from 'date-fns/locale/ru';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import addYears from 'date-fns/addYears';
import addMonths from 'date-fns/addMonths';
import _random from 'lodash/random';

import store from 'store';
import { setToken } from 'api/axios';
import { resetStore } from 'store/rootReducer';
// import { signOut } from 'api/authApi';

import token from './token';

export const logOut = () => {
  store.dispatch(resetStore());
  token.access.set(null);
  token.refresh.set(null);
  setToken(null);
  // signOut();
};

export const isMdWidth = (size = '') => {
  return ['sm', 'xs'].includes(size);
};

/**
 * @param {object} user
 * @param {"full" | "short" | "initials"} type
 * @param {"ru" | "en"} lang
 */
export const getFullName = (user, type = 'full', lang = 'ru') => {
  const {
    firstName: firstName_en = '',
    firstName_ru = '',

    lastName: lastName_en = '',
    lastName_ru = '',

    email = '',
  } = user;

  const firstName = (lang === 'ru' ? firstName_ru || firstName_en : firstName_en) || '';
  const lastName = (lang === 'ru' ? lastName_ru || lastName_en : lastName_en) || '';

  let fullName;

  switch (type) { // eslint-disable-line default-case
    case 'full':
      fullName = `${lastName} ${firstName}`.trim();
      break;

    case 'short':
      fullName = `${lastName} ${firstName.substring(0, 1)}.`;
      // If only a dot
      if (fullName.length === 1) {
        fullName = email;
      }
      break;

    // For avatars
    case 'initials':
      fullName = `${lastName.substring(0, 1)}${firstName.substring(0, 1)}`;
      if (!fullName) {
        fullName = email.substring(0, 1);
      }
      break;
  }
  return fullName || email;
};

// BURN IT WITH FIRE!!!
export const getHrAvatar = (id) => {
  const state = store.getState();
  const hrs = state.hrBoards.hrs || [];
  let hrAvatar = null;
  for (let i = 0; i < hrs.length; i++) {
    if (hrs[i].id === id) {
      hrAvatar = hrs[i].avatar;
      break;
    }
  }
  return hrAvatar;
};

export const getDistanceToNow = (date) => {
  const getNumberFromString = (str) => {
    return +str.match(/[0-9]*/g)[0];
  };

  const yearString = formatDistanceToNowStrict(
    date,
    { unit: 'year', locale: localeRu, roundingMethod: 'floor' },
  );
  const yearsCount = getNumberFromString(yearString);

  const montsDate = addYears(date, yearsCount);
  const monthsString = formatDistanceToNowStrict(
    montsDate,
    { unit: 'month', locale: localeRu, roundingMethod: 'floor' },
  );
  const monthsCount = getNumberFromString(monthsString);

  const daysDate = addMonths(montsDate, monthsCount);
  const daysString = formatDistanceToNowStrict(
    daysDate,
    { unit: 'day', locale: localeRu, roundingMethod: 'floor' },
  );

  return `${yearString} ${monthsString} ${daysString}`.replace(/0[^0-9]+/gm, '') || '0 дней';
};

/**
 * @param {Array<any>} list
 */
export const getRandomListItem = (list) => {
  return list[_random(0, list.length - 1, false)];
};

export default {
  logOut,
  isMdWidth,
  getFullName,
  getRandomListItem,
};
