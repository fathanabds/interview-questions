const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.use('/auth', require('./authRouter'));

router.use(auth);
router.use('/users', require('./userRouter'));
router.use('/products', require('./productRouter'));
router.use('/orders', require('./orderRouter'));

module.exports = router;
