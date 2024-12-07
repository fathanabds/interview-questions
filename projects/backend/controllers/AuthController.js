const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { user } = require('../models');

class AuthController {
  static async register(req, res, next) {
    const { name, email, npp, npp_supervisor, password } = req.body;
    try {
      const newUser = await user.create({ name, email, npp, npp_supervisor, password });
      res.status(201).json({ data: newUser });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: 'BadRequest', msg: 'Email is required' };
      }
      if (!password) {
        throw { name: 'BadRequest', msg: 'Password is required' };
      }
      const userData = await user.findOne({
        where: {
          email,
        },
      });
      if (!userData) {
        throw { name: 'BadRequest', msg: 'Invalid email/password' };
      }
      const isValidPassword = comparePassword(password, userData.password);
      if (!isValidPassword) {
        throw { name: 'BadRequest', msg: 'Invalid email/password' };
      }
      const access_token = signToken({ id: userData.id, email: userData.email });
      return res.json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AuthController;
