'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: 'Email must be unique',
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Email is required',
          },
          notNull: {
            msg: 'Email is required',
          },
          isEmail: {
            msg: 'Invalid email format',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password is required',
          },
          notNull: {
            msg: 'Password is required',
          },
          len: {
            args: [6],
            msg: 'Password must be min 6 chars',
          },
        },
      },
      role: {
        type: DataTypes.ENUM,
        values: ['admin', 'customer'],
        defaultValue: 'customer',
        validate: {
          isIn: {
            args: [['admin', 'customer']],
            msg: 'Role must be admin or customer',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
