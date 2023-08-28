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
        email: 'jsacramento@gmail.com',
        username: 'juuussstin',
        hashedPassword: bcrypt.hashSync('cook'),
        firstName: 'Justin',
        lastName: "Sacramento"
      },
      {
        email: 'kassidyrespicio@gmail.com',
        username: 'kassrespicio',
        hashedPassword: bcrypt.hashSync('nick'),
        firstName: 'Kassidy',
        lastName: 'Respicio'
      },
      {
        email: 'iansanluis@hotmail.com',
        username: 'iansanluis',
        hashedPassword: bcrypt.hashSync('guitar'),
        firstName: 'Ian',
        lastName: 'San Luis'
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
