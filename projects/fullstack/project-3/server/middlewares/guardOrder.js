const { Order } = require('../models');

async function guardOrder(req, res, next) {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) {
      throw { name: 'NotFound', message: 'Order not found' };
    }
    if (req.user.id == order.UserId || req.user.role == 'admin') {
      req.order = order;
      return next();
    } else {
      throw { name: 'Forbidden' };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = guardOrder;
