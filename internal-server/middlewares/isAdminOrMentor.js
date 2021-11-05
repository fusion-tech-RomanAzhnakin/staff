module.exports = function isAdminOrMentor(req, res, next) {
  try {
    if (req.user.role === 'admin' || req.user.role === 'mentor') {
      return next();
    }
    return res.sendStatus(403);
  } catch (err) {
    return res.sendStatus(403);
  }
};
