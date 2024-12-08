'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init(
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
      sex: {
        type: DataTypes.ENUM,
        values: ['M', 'F'],
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Sex is required',
          },
          notNull: {
            msg: 'Sex is required',
          },
          isIn: {
            args: [['M', 'F']],
            msg: 'Invalid sex',
          },
        },
      },
      religion: {
        type: DataTypes.ENUM,
        values: ['Islam', 'Protestan', 'Hindu', 'Buddha', 'Khonghucu', 'Katolik'],
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Religion is required',
          },
          notNull: {
            msg: 'Religion is required',
          },
          isIn: {
            args: [['Islam', 'Protestan', 'Hindu', 'Buddha', 'Khonghucu', 'Katolik']],
            msg: 'Invalid religion',
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Phone is required',
          },
          notNull: {
            msg: 'Phone is required',
          },
          isNumeric: {
            msg: 'Phone must be numbers',
          },
          len: {
            args: [12],
            msg: 'Phone must be 12 digit',
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Address is required',
          },
          notNull: {
            msg: 'Address is required',
          },
        },
      },
      nik: {
        type: DataTypes.STRING,
        unique: {
          msg: 'NIK must be unique',
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'NIK is required',
          },
          notNull: {
            msg: 'NIK is required',
          },
          isNumeric: {
            msg: 'NIK must be numbers',
          },
          len: {
            args: [16],
            msg: 'NIK must be 16 digit',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Patient',
    }
  );
  return Patient;
};
