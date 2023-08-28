'use strict';

const { ReviewImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const validReviewImages = [
  {
    reviewId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/9348db93-1b50-47c0-9aff-11ead5facd22.jpeg"
  },
  {
    reviewId: 2,
    url: "https://a0.muscache.com/im/pictures/0775938d-978a-4265-a4d8-1416372a74bd.jpg"
  },
  {
    reviewId: 3,
    url: "https://a0.muscache.com/im/pictures/447cbbd8-4785-4bdd-8bf2-63936c60838d.jpg"
  },
  {
    reviewId: 4,
    url: "https://a0.muscache.com/im/pictures/56ed5bdd-5490-4eb2-a00e-84403e4b521f.jpg"
  },
  {
    reviewId: 5,
    url: "https://a0.muscache.com/im/pictures/c6ea3fc0-37fb-4725-b546-31c66583b98b.jpg"
  },
  {
    reviewId: 6,
    url: "https://a0.muscache.com/im/pictures/16079721/b9f1eb04_original.jpg"
  },
  {
    reviewId: 7,
    url: "https://a0.muscache.com/im/pictures/17004189/27881b2b_original.jpg"
  },
  {
    reviewId: 8,
    url: "https://a0.muscache.com/im/pictures/16074720/d33eefae_original.jpg"
  },
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
