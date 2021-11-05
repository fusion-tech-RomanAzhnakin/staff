module.exports = function isAllowedFor(roleList) {
  return (req, res, next) => {
    try {
      if (roleList.includes(req.user.role)) {
        return next();
      }
      return res.sendStatus(403);
    } catch (err) {
      return res.sendStatus(403);
    }
  };
};
