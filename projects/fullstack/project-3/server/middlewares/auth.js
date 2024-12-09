const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function auth(req, res, next) {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      throw { name: 'Unauthorized', message: 'Invalid token' };
    }
    const token = bearer.split(' ')[1];
    if (!token) {
      throw { name: 'Unauthorized', message: 'Invalid token' };
    }
    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: 'Unauthorized', message: 'Invalid token' };
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = auth;
