const { StatusCodes } = require('http-status-codes');

const errorHandler = require('../utils/errorHandler');

const forRoles = (roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(StatusCodes.FORBIDDEN).json('user have invalid role');
      }

      next();
    } catch (err) {
      err.functionName = forRoles.name;
      err.fileName = __filename;
      errorHandler(err, req, res, next);
    }
  };
};

module.exports = forRoles;
