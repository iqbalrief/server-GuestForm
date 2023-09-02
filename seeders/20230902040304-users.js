'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     
      await queryInterface.bulkInsert('Users', [{
       username: "Users",
       password: await bcrypt.hash("users", 10),
       role: "users",
       createdAt: new Date(),
       updatedAt: new Date(),
       }, 
       {
       username: "admin",
       password: await bcrypt.hash("admin", 10),
       role: "admin",
       createdAt: new Date(),
       updatedAt: new Date(),
       }
      
      ], {});
   
   
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
