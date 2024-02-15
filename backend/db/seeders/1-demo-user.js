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
        username: 'HelterSkelter',
        hashedPassword: bcrypt.hashSync('cooking1'),
        firstName: 'George',
        lastName: "Herman"
      },
      {
        email: 'kassidyrespicio@gmail.com',
        username: 'Humbug',
        hashedPassword: bcrypt.hashSync('nick'),
        firstName: 'Nora',
        lastName: 'Smith'
      },
      {
        email: 'iansanluis@hotmail.com',
        username: 'helloworld',
        hashedPassword: bcrypt.hashSync('guitar'),
        firstName: 'Jonathan',
        lastName: 'Lewis'
      },
      {
        email: 'iowneverything@airbnb.com',
        username: 'rentcollector3000',
        hashedPassword: bcrypt.hashSync('landlord'),
        firstName: 'Kevin',
        lastName: 'Baik'
      },
      {
        email: 'demouser@appacademy.com',
        username: 'demouser',
        hashedPassword: bcrypt.hashSync('demouser'),
        firstName: 'Demo',
        lastName: 'User'
      },
      {
        email: 'arogan@gmail.com',
        username: 'DemolitionDona',
        hashedPassword: bcrypt.hashSync('hello1'),
        firstName: 'Katie',
        lastName: 'King'
      },
      {
        email: 'kmendoza@yahoo.com',
        username: 'beefwellington',
        hashedPassword: bcrypt.hashSync('skate1'),
        firstName: 'Chris',
        lastName: 'Pesto'
      },
      {
        email: 'rimperio@gmail.com',
        username: 'lovinglover',
        hashedPassword: bcrypt.hashSync('hello1'),
        firstName: 'Kira',
        lastName: 'Lopez'
      },
      {
        email: 'nickyp@gmail.com',
        username: 'JinJun',
        hashedPassword: bcrypt.hashSync('hello1'),
        firstName: 'Jun',
        lastName: 'Lee'
      },
      {
        email: 'teddydog@gmail.com',
        username: 'MaltipoodleFan',
        hashedPassword: bcrypt.hashSync('hello1'),
        firstName: 'Teddy',
        lastName: 'Baik'
      },
      {
        email: 'BestTA@gmail.com',
        username: 'IloveCSS',
        hashedPassword: bcrypt.hashSync('appac1'),
        firstName: 'Jefferson',
        lastName: 'Appacademy'
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
