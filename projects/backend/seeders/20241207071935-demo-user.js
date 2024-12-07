'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../users.json').map((e) => {
      e.password = hashPassword(e.password);
      e.createdAt = e.updatedAt = new Date();
      return e;
    });

    await queryInterface.bulkInsert('users', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
