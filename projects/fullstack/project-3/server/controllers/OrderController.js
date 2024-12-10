const createOrder = require('../helpers/createOrder');
const { Order, Product, sequelize } = require('../models');

class OrderController {
  static async findAll(req, res, next) {
    try {
      const orders = await Order.findAllByRole(req.user);
      res.json(orders);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async create(req, res, next) {
    const { ProductId, quantity } = req.body;
    const t = await sequelize.transaction();
    try {
      const newOrder = await createOrder(t, ProductId, quantity, req.user);
      await t.commit();
      res.status(201).json(newOrder);
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  static async findByPk(req, res, next) {
    try {
      const product = await Product.findByPk(req.order.ProductId);
      res.json({ order: req.order, product });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updatePayment(req, res, next) {
    try {
      req.order.isPaid = true;
      await req.order.save();
      res.json({ message: 'Success update payment status' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      if (!req.order.isPaid) {
        throw { name: 'BadRequest', message: 'Order must be paid first' };
      }
      await req.order.destroy();
      res.json({ message: 'Success delete order' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = OrderController;
