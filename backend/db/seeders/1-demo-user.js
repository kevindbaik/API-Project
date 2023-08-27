'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'alberteinstein1935@gmail.com',
        username: 'boygenius',
        hashedPassword: bcrypt.hashSync('imsosmart'),
        firstName: 'Albert',
        lastName: "Einstein"
      },
      {
        email: 'michelleobama@america.us',
        username: 'michelleobama',
        hashedPassword: bcrypt.hashSync('america'),
        firstName: 'Michelle',
        lastName: 'Obama'
      },
      {
        email: 'frankocean@blonded.com',
        username: 'blonded',
        hashedPassword: bcrypt.hashSync('hublots'),
        firstName: 'Frank',
        lastName: 'Ocean'
      },
      {
        email: 'iowneverything@airbnb.com',
        username: 'rentcollector3000',
        hashedPassword: bcrypt.hashSync('landlord'),
        firstName: 'Land',
        lastName: 'Lord'
      },
      {
        email: 'demouser@appacademy.com',
        username: 'demouser',
        hashedPassword: bcrypt.hashSync('demouser'),
        firstName: 'demo',
        lastName: 'user'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['boygenius', 'michelleobama', 'blonded', 'rentcollector3000'] }
    }, {});
  }
};
