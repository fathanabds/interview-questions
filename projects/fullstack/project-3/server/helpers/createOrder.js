const { Product, Order } = require('../models');

async function createOrder(t, ProductId, quantity, user) {
  const product = await Product.findByPk(ProductId);
  if (!product) {
    throw { name: 'NotFound', message: 'Product not found' };
  }
  if (product.stock < quantity) {
    throw { name: 'BadRequest', message: 'Not enough stock' };
  }
  const totalPrice = product.price * quantity;
  const newOrder = await Order.create({ UserId: user.id, ProductId, quantity, totalPrice }, { transaction: t });
  product.stock -= +quantity;
  await product.save({ transaction: t });
  return newOrder;
}

module.exports = createOrder;
