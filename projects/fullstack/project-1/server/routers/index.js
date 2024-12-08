const express = require('express');
const router = express.Router();

router.use('/patients', require('./patientRouter'));

module.exports = router;
