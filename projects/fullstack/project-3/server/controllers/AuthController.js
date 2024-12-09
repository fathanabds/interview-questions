const { where } = require('sequelize');
const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class AuthController {
  static async register(req, res, next) {
    const { email, password, role } = req.body;
    try {
      const newUser = await User.create({ email, password, role });
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: 'BadRequest', message: 'Email is required' };
      }
      if (!password) {
        throw { name: 'BadRequest', message: 'Password is required' };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: 'BadRequest', message: 'Invalid email/password' };
      }
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: 'BadRequest', message: 'Invalid email/password' };
      }
      const access_token = signToken({ id: user.id, email: user.email });
      res.json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AuthController;
