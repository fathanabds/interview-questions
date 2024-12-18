const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

// base url => /users
router.get('/', UserController.findByPk);
router.put('/', UserController.update);
router.delete('/', UserController.destroy);

module.exports = router;
