module.exports = (req, res, next) => {
  try {
    if (req.user.role === 'manager' || req.user.role === 'hr' || req.user.role === 'admin' || String(req.user.id) === String(req.params.id)) {
      return next();
    }
    return res.sendStatus(403);
  } catch (err) {
    return res.sendStatus(403);
  }
};
