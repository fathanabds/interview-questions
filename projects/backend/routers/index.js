const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRouter'));
router.use('/presences', require('./presenceRouter'));

module.exports = router;
