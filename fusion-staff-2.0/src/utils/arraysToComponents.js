import React from 'react';
import _ from 'lodash';
/**
 *
 * @param {Array<any>} array
 * @param {string} keyInObject
 * @param {string} delimiter
 * @param {string} componentType
 * @param {(value: string) => void} onClick
 * @param  {...any} props
 * @returns
 */
export const arrayToItems = (
  array,
  keyInObject,
  delimiter,
  componentType,
  onClick = () => {},
  ...props
) => {
  if (!_.isArray(array)) {
    return [];
  }

  return array.map((arrayItem, index) => {
    return React.createElement(
      componentType,
      {
        ...props,
        onClick: () => onClick(arrayItem[keyInObject]),
        key: `href${arrayItem[keyInObject]}${index}`,
      },
      `${arrayItem[keyInObject]}${index !== array.length - 1 ? delimiter : ''}`,
    );
  });
};
