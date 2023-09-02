'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Guests', [{
      name: "HWD",
      address: "Jakarta",
      phoneNumber: "085678788",
      note: "Semoga Langgeng",
      createdAt: new Date(),
      updatedAt: new Date(),  
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
