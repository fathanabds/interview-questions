function isAdmin(req, res, next) {
  try {
    if (req.user.role == 'admin') {
      return next();
    }
    throw { name: 'Forbidden' };
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = isAdmin;
