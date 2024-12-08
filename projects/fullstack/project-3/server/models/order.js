'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsTo(models.Product);
    }
  }
  Order.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'User Id is required',
          },
          notNull: {
            msg: 'User Id is required',
          },
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Product Id is required',
          },
          notNull: {
            msg: 'Product Id is required',
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Quantity is required',
          },
          notNull: {
            msg: 'Quantity is required',
          },
          min: {
            args: 1,
            msg: 'Quantity must be >= 1',
          },
        },
      },
      isPaid: { type: DataTypes.BOOLEAN, defaultValue: false },
      totalPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
