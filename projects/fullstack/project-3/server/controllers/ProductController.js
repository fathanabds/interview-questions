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
      if (!product) {
        throw { name: 'NotFound', message: 'Product not found' };
      }
      res.json(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    const { name, stock, price, category } = req.body;
    try {
      await Product.update(
        { name, stock, price, category },
        {
          where: {
            id: req.params.productId,
          },
        }
      );
      res.json({ message: 'Update product success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      await Product.destroy({
        where: {
          id: req.params.productId,
        },
      });
      res.json({ message: 'Delete product success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ProductController;
