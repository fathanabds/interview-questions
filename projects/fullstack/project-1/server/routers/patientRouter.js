const express = require('express');
const PatientController = require('../controllers/PatientController');
const router = express.Router();

// base url => /patients
router.get('/', PatientController.findAll);
router.post('/', PatientController.create);
router.get('/:patientId', PatientController.findByPk);
router.put('/:patientId', PatientController.update);
router.delete('/:patientId', PatientController.destroy);

module.exports = router;
