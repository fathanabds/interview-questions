const { hashPassword } = require('../helpers/bcrypt');

class UserController {
  static async update(req, res, next) {
    const { email, password, role } = req.body;
    try {
      req.user.email = email ? email : req.user.email;
      req.user.password = password ? hashPassword(password) : req.user.password;
      req.user.role = role ? role : req.user.role;
      await req.user.save();
      res.json({ message: 'Update user success', result: req.user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      await req.user.destroy();
      res.json({ message: 'Delete user success', result: req.user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
