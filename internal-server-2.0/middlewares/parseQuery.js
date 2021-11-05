const _ = require('lodash');
const errorHandler = require('../utils/errorHandler');

const parseArray = (array) => {
  return array.map((arrayItem) => JSON.parse(arrayItem));
};

const fieldsToParse = ['pagination', 'sort', 'filter', 'include'];
const parseQuery = (req, res, next) => {
  try {
    const { query } = req;

    fieldsToParse.forEach((key) => {
      const value = query[key];
      let parsedValue;

      try {
        if (_.isArray(value)) {
          parsedValue = parseArray(value);
        } else {
          parsedValue = JSON.parse(value);
        }
      } catch (err) {
        parsedValue = value;
      }

      query[key] = parsedValue;
    });

    req.query = query;

    next();
  } catch (err) {
    err.functionName = parseQuery.name;
    err.fileName = __filename;
    errorHandler(err, req, res, next);
  }
};

module.exports = parseQuery;
