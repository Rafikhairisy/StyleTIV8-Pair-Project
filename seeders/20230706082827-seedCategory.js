'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = JSON.parse(fs.readFileSync('./data/category.json', 'utf-8')).map(el => {
    el.updatedAt = new Date()
    el.createdAt = new Date()
    return el
   })
   return queryInterface.bulkInsert("Categories", data)
  },

   down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null)
  }
}
