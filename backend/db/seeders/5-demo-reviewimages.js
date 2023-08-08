'use strict';

const { ReviewImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const validReviewImages = [
  {
    reviewId: 1,
    url: "https://airbnb.com/blonded/uploads/9942"
  },
  {
    reviewId: 1,
    url: "https://airbnb.com/michelleobama/uploads/1973"
  },
  {
    reviewId: 2,
    url: "https://airbnb.com/michelleobama/uploads/1343"
  },
  {
    reviewId: 3,
    url: "https://airbnb.com/boygenius/uploads/4245"
  },
  {
    reviewId: 3,
    url: "https://airbnb.com/boygenius/uploads/4265"
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await ReviewImage.bulkCreate(validReviewImages, {validate: true})
    } catch(err) {
      console.log(err);
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options)
  }
};
