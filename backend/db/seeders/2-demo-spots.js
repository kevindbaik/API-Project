'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */


const validSpots = [
  {
    ownerId: 4,
    address: '99999 Fairfield Ranch',
    city: 'Chino Hills',
    state: 'California',
    country: 'United States',
    lat: 33.997,
    lng: -117.73,
    name: 'CHINO HILLS APARTMENT',
    description: '2 bed/1 bath apartment. No animals allowed. No parties allowed.',
    price: 300.00
  },
  {
    ownerId: 4,
    address: '301 Laughsburg',
    city: 'Brooklyn',
    state: 'New York',
    country: 'United States',
    lat: 64.963,
    lng: -19.02,
    name: 'NY MANSION',
    description: '6 bed/4 bath mansion located in the heart of downtown Reykjavik. Near many bars and clubs.',
    price: 5000.00
  },
  {
    ownerId: 4,
    address: '1204 Pike Street',
    city: 'Seattle',
    state: 'Washington',
    country: 'United States',
    lat: 47.66,
    lng: -122.33,
    name: 'SEATTLE SMALL CONDO',
    description: '1 bed/1 bath condo right outside the famous Pike Market.',
    price: 125.00
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
    await Spot.bulkCreate(validSpots, {validate: true})
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: {
        [Op.in] : ['CHINO HILLS APARTMENT', 'ICELAND MANSION', 'SEATTLE SMALL CONDO']
      }
    })
  }
};
