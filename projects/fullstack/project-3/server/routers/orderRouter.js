const express = require('express');
const OrderController = require('../controllers/OrderController');
const guardOrder = require('../middlewares/guardOrder');
const router = express.Router();

// base url => /orders
router.get('/', OrderController.findAll);
router.post('/', OrderController.create);
router.get('/:orderId', guardOrder, OrderController.findByPk);
router.patch('/:orderId', guardOrder, OrderController.updatePayment);
router.delete('/:orderId', guardOrder, OrderController.destroy);

module.exports = router;
