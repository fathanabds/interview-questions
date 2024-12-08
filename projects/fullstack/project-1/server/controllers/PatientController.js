const { Patient } = require('../models');

class PatientController {
  static async create(req, res, next) {
    const { name, sex, religion, phone, address, nik } = req.body;
    try {
      const newPatient = await Patient.create({ name, sex, religion, phone, address, nik });
      res.status(201).json({
        status: {
          code: 201,
          response: 'success',
          message: 'success add patient',
        },
        result: newPatient,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      const patients = await Patient.findAll();
      res.status(200).json({
        status: {
          code: 200,
          response: 'success',
          message: 'success get patients',
        },
        result: patients,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findByPk(req, res, next) {
    const { patientId } = req.params;
    try {
      const patient = await Patient.findByPk(patientId);
      if (!patient) {
        throw { name: 'NotFound' };
      }
      res.status(200).json({
        status: {
          code: 200,
          response: 'success',
          message: 'success get patient',
        },
        result: patient,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    const { patientId } = req.params;
    const { name, sex, religion, phone, address, nik } = req.body;
    try {
      const patient = await Patient.findByPk(patientId);
      if (!patient) {
        throw { name: 'NotFound' };
      }
      patient.name = name ? name : patient.name;
      patient.sex = sex ? sex : patient.sex;
      patient.religion = religion ? religion : patient.religion;
      patient.phone = phone ? phone : patient.phone;
      patient.address = address ? address : patient.address;
      patient.nik = nik ? nik : patient.nik;
      await patient.save();
      res.status(200).json({
        status: {
          code: 200,
          response: 'success',
          message: 'success update patient',
        },
        result: patient,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async destroy(req, res, next) {
    const { patientId } = req.params;
    try {
      const patient = await Patient.findByPk(patientId);
      if (!patient) {
        throw { name: 'NotFound' };
      }
      await patient.destroy();
      res.status(200).json({
        status: {
          code: 200,
          response: 'success',
          message: 'success delete patient',
        },
        result: patient,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = PatientController;
