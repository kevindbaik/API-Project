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
    address: '1234 Fairfield Ranch',
    city: 'Chino Hills',
    state: 'California',
    country: 'United States',
    lat: 33.997,
    lng: -117.73,
    name: 'Chino Hills Apartment',
    description: '2 bed and 1 bath apartment. No animals allowed. No parties allowed. Guests must be approved by home owner.',
    price: 300.00
  },
  {
    ownerId: 4,
    address: '301 Gloom Street',
    city: 'Brooklyn',
    state: 'New York',
    country: 'United States',
    lat: 64.963,
    lng: -19.02,
    name: 'Brooklyn NY Mansion',
    description: '6 bed and 4 bath mansion located in the heart of Brooklyn. Near many bars and clubs. Secluded area with security and gate code.',
    price: 5000.00
  },
  {
    ownerId: 4,
    address: '1204 Pike Place',
    city: 'Seattle',
    state: 'Washington',
    country: 'United States',
    lat: 47.66,
    lng: -122.33,
    name: 'Seattle Condo',
    description: '1 bed and 1 bath condo right outside the famous Pike Market.',
    price: 125.00
  },
  {
    ownerId: 4,
    address: '1708 Olympic Avenue',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 33.99,
    lng: 11.22,
    name: 'Los Angeles Home w/ pool and jacuzzi',
    description: '4 bed and 2 bath home located in Koreatown. Pool and jacuzzi have cleaned every month.',
    price: 355.00
  },
  {
    ownerId: 4,
    address: '355 Snuffle Street',
    city: 'Dallas',
    state: 'Texas',
    country: 'United States',
    lat: 55.66,
    lng: -111.22,
    name: 'Downtown Dallas Dream Home',
    description: '4 bed and 3 bath home located in the heart of Dallas, Texas. Great location and near many fantastic food spots.',
    price: 655.00
  },
  {
    ownerId: 4,
    address: '777 Lucky Road',
    city: 'Las Vegas',
    state: 'Nevada',
    country: 'United States',
    lat: 34.66,
    lng: -112,
    name: 'Vegas Luxury Studio Apartment',
    description: '2 bed and 2 bath studio apartment on the strip of Las Vegas. Enjoy everything sin city has to offer with this amazing apartment!',
    price: 400.00
  },
  {
    ownerId: 2,
    address: '15240 Canon Lane',
    city: 'Irvine',
    state: 'California',
    country: 'United States',
    lat: 45.66,
    lng: -120.76,
    name: 'Beautiful Family House in Irvine',
    description: '5 bed and 3 house in Irvine, California. Includes kids playroom, backyard grill, and pool. Very safe neighborhood.',
    price: 600.00
  },
  {
    ownerId: 5,
    address: '12345 Demo Street',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    lat: 49.12,
    lng: -126.33,
    name: 'Bay Area Condo',
    description: '1 bed and 1 bath condo right across the App Academy campus.',
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
