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
    url: "https://randomimageURL.com/house/1/1",
    preview: true
  },
  {
    spotId: 1,
    url: "https://randomimageURL.com/house/1/2",
    preview: false
  },
  {
    spotId: 2,
    url: "https://randomimageURL.com/house/2/1",
    preview: true
  },
  {
    spotId: 2,
    url: "https://randomimageURL.com/house/2/2",
    preview: false
  },
  {
    spotId: 3,
    url: "https://randomimageURL.com/house/3/1",
    preview: true
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
