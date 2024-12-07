const express = require('express');
const authentication = require('../middlewares/authentication');
const PresenceController = require('../controllers/PresenceController');
const isSpv = require('../middlewares/isSpv');
const router = express.Router();

router.use(authentication);

// base url => /presence
router.post('/', PresenceController.create);
router.get('/', PresenceController.findAll);
router.patch('/:presenceId', isSpv, PresenceController.approve);

module.exports = router;
