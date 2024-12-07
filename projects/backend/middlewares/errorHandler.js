function errorHandler(err, req, res, next) {
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
    case 'SequelizeValidationError':
      return res.status(400).json({ message: err.errors[0].message });
    case 'BadRequest':
      return res.status(400).json({ message: err.msg });
    case 'NotFound':
      return res.status(404).json({ message: err.msg });
    case 'Forbidden':
      return res.status(403).json({ message: 'You have no access' });
    case 'Unauthorized':
      return res.status(401).json({ message: err.msg });
    case 'JsonWebTokenError':
      return res.status(401).json({ message: 'Invalid token' });
    default:
      res.status(500).json({ message: 'Internal server error' });
      break;
  }
}

module.exports = errorHandler;
