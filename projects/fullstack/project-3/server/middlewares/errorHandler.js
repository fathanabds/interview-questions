function errorHandler(err, req, res, next) {
  switch (err.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      return res.status(400).json({ message: err.errors[0].message });
    case 'BadRequest':
      return res.status(400).json({ message: err.message });
    case 'Unauthorized':
      return res.status(401).json({ message: err.message });
    case 'JsonWebTokenError':
      return res.status(401).json({ message: 'Invalid token' });
    case 'Forbidden':
      return res.status(403).json({ message: 'You have no access' });
    default:
      res.status(500).json({ message: 'Internal server error' });
      break;
  }
}

module.exports = errorHandler;
