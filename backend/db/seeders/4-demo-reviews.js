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
    userId: 5,
    review: 'Not a bad stay. Kitchen was a little too small, and fridge was not working properly.',
    stars: 3
  },
  {
    spotId: 3,
    userId: 1,
    review: 'Nothing works and it smells horrible. Television was stuck on same screen entire time. I will contact support for a refund.',
    stars: 1
  },
  {
    spotId: 5,
    userId: 3,
    review: 'Boring. Would not recommend if you are trying to have a good time.',
    stars: 2,
  },
  {
    spotId: 6,
    userId: 2,
    review: 'A nice place with a great view! Jacuzzi was amazing! Thanks for the hospitality.',
    stars: 4
  },
  {
    spotId: 4,
    userId: 1,
    review: 'Wonderful, cozy little spot. Enjoyed my time here and the host was so nice.',
    stars: 4
  },
  {
    spotId: 7,
    userId: 1,
    review: 'Such a tremendous treehouse. Would love to stay here longer.',
    stars: 5
  },
  {
    spotId: 8,
    userId: 3,
    review: 'You can smell the river from the bedroom and entire area was infested with bugs and trash. Animals also come by and try to eat our food.',
    stars: 2
  }
];

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
