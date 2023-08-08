'use strict';

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

const validSpotImages = [
  {
    spotId: 1,
    url: "https://lastudioapartment.com",
    preview: true
  },
  {
    spotId: 2,
    url: "https://chinohillsapartment.com",
    preview: true
  },
  {
    spotId: 3,
    url: "https://seattlepikecondos.com",
    preview: false
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await SpotImage.bulkCreate(validSpotImages, {validate: true})
    } catch(err) {
      console.log(err);
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options)
  }
};
