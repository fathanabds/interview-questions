const { Product } = require('../models');

class ProductController {
  static async create(req, res, next) {
    const { name, stock, price, category } = req.body;
    try {
      const newProduct = await Product.create({ name, stock, price, category });
      res.status(201).json(newProduct);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findByPk(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.productId);
      res.json(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ProductController;
