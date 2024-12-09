const express = require('express');
const isAdmin = require('../middlewares/isAdmin');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

// base url => /products
router.get('/', ProductController.findAll);
router.post('/', isAdmin, ProductController.create);
router.get('/:productId', ProductController.findByPk);
router.put('/:productId', isAdmin);
router.delete('/:productId', isAdmin);

module.exports = router;