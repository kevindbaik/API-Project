'use strict';

const { Booking } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

const validBookings = [
  {
    spotId: 2,
    userId: 3,
    startDate: '2022-12-24',
    endDate: '2023-01-02'
  },
  {
    spotId: 1,
    userId: 2,
    startDate: '2022-10-19',
    endDate: '2022-10-21'
  },
  {
    spotId: 3,
    userId: 1,
    startDate: '2022-08-20',
    endDate: '2022-08-26'
  },
  {
    spotId: 1,
    userId: 3,
    startDate: '2023-07-20',
    endDate: '2023-07-23'
  },
  {
    spotId: 3,
    userId: 2,
    startDate: '2023-12-25',
    endDate: '2023-12-28'
  },
  {
    spotId: 4,
    userId: 5,
    startDate: '2023-10-11',
    endDate: '2023-10-18'
  },
  {
    spotId: 5,
    userId: 5,
    startDate: '2023-10-19',
    endDate: '2023-10-22'
  },
  {
    spotId: 6,
    userId: 2,
    startDate: '2024-01-12',
    endDate: '2024-01-14'
  },
  {
    spotId: 7,
    userId: 4,
    startDate: '2023-09-12',
    endDate: '2023-09-14'
  },
  {
    spotId: 8,
    userId: 4,
    startDate: '2023-11-10',
    endDate: '2023-11-12'
  },
];


module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Booking.bulkCreate(validBookings, {validate: true})
    } catch(err) {
      console.log(err);
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options)
  }
};
