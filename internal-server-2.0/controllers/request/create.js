/* eslint-disable no-console */
const { StatusCodes } = require('http-status-codes');

const requestService = require('../../db/services/request');

const createRequest = async (req, res, next) => {
  try {
    const data = {
      title: req.body.title,
      type: req.body.type,
      comment: req.body.comment,
      dateFrom: req.body.dateFrom,
      dateTo: req.body.dateTo,
      dates: req.body.dates,
      rest_days_number: req.body.rest_days_number,
    };

    let userId;
    if (req.user.role === 'admin') {
      userId = req.body.userId || req.user.id;
    } else {
      userId = req.user.id;
    }

    data.user_id = userId;

    const newRequest = await requestService.create(data);

    // TO-DO: Notify admins here

    res.status(StatusCodes.CREATED).json({ data: newRequest });
  } catch (err) {
    err.functionName = createRequest.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = createRequest;
