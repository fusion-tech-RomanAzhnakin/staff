import { getFullName } from './utils';

export const arrayToSelectOptions = (labelParam, valueParam) => {
  return {
    label: labelParam,
    value: valueParam,
  };
};

export const constantsToSelectOptions = (valuesObject, namesObject) => {
  const options = Object.keys(valuesObject).map((key) => ({
    label: namesObject[key],
    value: valuesObject[key],
  }));

  return options;
};

export const getItemToOptionCallback = (lableKey = 'title') => {
  return (item) => ({
    label: item[lableKey],
    value: item.id,
  });
};

export const commonOptionFormatter = getItemToOptionCallback();

export const userOptionFormatter = (user) => ({
  label: getFullName(user, 'full'),
  value: user.id,
});

//  const value = subs.map((id) => userOptionFormatter(users[id]))
