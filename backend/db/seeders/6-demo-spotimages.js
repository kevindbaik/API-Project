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
    url: "https://a0.muscache.com/im/pictures/73198cba-b765-4719-9492-85995c4ba7b3.jpg",
    preview: true
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/2336ba42-9633-445a-a86b-b7a4b9a04cda.jpg",
    preview: false
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/271a2e2f-c29a-464b-93de-c06289afa2c7.jpg",
    preview: true
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/f822f0d8-efa8-4b0b-a053-0a89cc0bec0c.jpg",
    preview: false
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/c61f2a9f-a23f-499d-b632-e18e31514ce6.jpg",
    preview: true
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/356ed32c-cf17-4927-a341-8c3a95d49dce.jpg",
    preview: false
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/6ca5dd2a-a817-4449-8637-4feb2617a612.jpg",
    preview: true
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/7b8c62f3-ca4b-4435-87d7-d01ac6902136.jpg",
    preview: false
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-22453073/original/f483336d-35c9-42dd-97bc-2dd35cfd4311.jpeg",
    preview: true
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-22453073/original/022d59df-8654-4d23-9b2d-848eb768f1a2.jpeg",
    preview: false
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/5766572e-a243-4f5e-9945-edf9be89b2ae.jpg",
    preview: true
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-45727406/original/7e801126-51bb-4618-b7a5-555385229200.jpeg",
    preview: false
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/e9b0262e-b243-4f1f-8a89-679e97aac94c.jpg",
    preview: true
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/76608b9f-5c66-4a86-b7c4-6f90e6b07fe6.jpg",
    preview: false
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-678349575561560896/original/f2a00423-3a7c-457c-8484-6228354e6311.jpeg",
    preview: true
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-678349575561560896/original/1922faef-242a-4110-a4a1-d94969d99511.jpeg",
    preview: false
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/f906fe29-49de-4375-a485-a8148c5e0de0.jpg",
    preview: true
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-46220931/original/bdc05466-e6b8-4954-beb9-ecd12b436dc7.jpeg",
    preview: true
  },
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
