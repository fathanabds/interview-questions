'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Order);
    }
  }
  Product.init(
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
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Stock is required',
          },
          notNull: {
            msg: 'Stock is required',
          },
          min(value) {
            if (value < 0) {
              throw new Error('Stock must be >= 0');
            }
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Price is required',
          },
          notNull: {
            msg: 'Price is required',
          },
          min(value) {
            if (value < 0) {
              throw new Error('Price must be >= 0');
            }
          },
        },
      },
      category: {
        type: DataTypes.ENUM,
        values: ['fnb', 'retail'],
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Category is required',
          },
          notNull: {
            msg: 'Category is required',
          },
          isIn: {
            args: [['fnb', 'retail']],
            msg: 'Role must be fnb or retail',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
