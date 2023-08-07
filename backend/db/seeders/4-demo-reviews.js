'use strict';

const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */

const validReviews = [
  {
    spotId: 2,
    userId: 3,
    review: 'Perfect. Location could not have been any better. A great time with a great atmosphere.',
    stars: 5
  },
  {
    spotId: 1,
    userId: 2,
    review: 'Not a bad stay. Upstair neighbors were loud, but other than that it was nice apartment.',
    stars: 3
  },
  {
    spotId: 3,
    userId: 1,
    review: 'Very, very small. Nothing works and it smells horrible. Noises outside were very bothersome and I got zero work done. I will contact support for a refund.',
    stars: 0
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Review.bulkCreate(validReviews, {validate: true})
    } catch(err) {
      console.log(err);
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options)
  }
};
