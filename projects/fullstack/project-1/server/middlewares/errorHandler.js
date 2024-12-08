function errorHandler(err, req, res, next) {
  switch (err.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      return res.status(400).json({ message: err.errors[0].message });
    case 'NotFound':
      return res.status(404).json({ message: 'Data not found' });
    default:
      res.status(500).json({ message: 'Internal server error' });
      break;
  }
}

module.exports = errorHandler;
