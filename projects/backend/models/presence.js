'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class presence extends Model {
    static associate(models) {
      presence.belongsTo(models.user, { foreignKey: 'id_users' });
    }
  }
  presence.init(
    {
      id_users: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Id users is required',
          },
          notNull: {
            msg: 'Id users is required',
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Type is required',
          },
          notNull: {
            msg: 'Type is required',
          },
          isIn: {
            args: [['IN', 'OUT']],
            msg: 'Type must be IN or OUT',
          },
        },
      },
      waktu: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Waktu is required',
          },
          notNull: {
            msg: 'Waktu is required',
          },
          isBefore(value) {
            if (value > new Date()) {
              throw new Error('Presence must be now/before');
            }
          },
        },
      },
      is_approve: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'presence',
    }
  );
  return presence;
};
