const { verifyToken } = require('../helpers/jwt');
const { user } = require('../models');

async function authentication(req, res, next) {
  const bearer = req.headers.authorization;
  try {
    if (!bearer) {
      throw { name: 'Unauthorized', msg: 'Invalid token' };
    }
    const token = bearer.split(' ')[1];
    if (!token) {
      throw { name: 'Unauthorized', msg: 'Invalid token' };
    }
    const payload = verifyToken(token);

    const userData = await user.findByPk(payload.id);

    if (!userData) {
      throw { name: 'Unauthorized', msg: 'Invalid token' };
    }
    req.user = userData;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authentication;
