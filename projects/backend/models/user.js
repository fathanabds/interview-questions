'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.presence, { foreignKey: 'id_users' });
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Name is required',
          },
          notNull: {
            msg: 'Name is required',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email must be unique',
        },
        validate: {
          notEmpty: {
            msg: 'Email is required',
          },
          notNull: {
            msg: 'Email is required',
          },
        },
      },
      npp: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Npp must be unique',
        },
        validate: {
          notEmpty: {
            msg: 'Npp is required',
          },
          notNull: {
            msg: 'Npp is required',
          },
          isNumeric: {
            msg: 'Npp must be numbers',
          },
          len: {
            args: [4],
            msg: 'Npp must be 4 numbers',
          },
        },
      },
      npp_supervisor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Npp supervisor is required',
          },
          notNull: {
            msg: 'Npp supervisor is required',
          },
          isNumeric: {
            msg: 'Npp supervisor must be numbers',
          },
          len: {
            args: [4],
            msg: 'Npp supervisor must be 4 numbers',
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
        },
      },
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  user.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return user;
};
