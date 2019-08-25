'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('users', [
      {
        username: 'Aegar',
        email: 'aegar@reroll.com',
        // password is password
        passwordHash: '$2b$10$GFqClXyq6RfqMu.sz0yRE.ntfeT4UauR8Cy/fRgv357OZ/fpV5u4y',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('users', null, {});
  }
};
