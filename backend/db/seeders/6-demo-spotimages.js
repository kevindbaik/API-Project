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
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/f2fea6a5-292e-4c14-b806-aa814a562f67.jpg",
    preview: false
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/8ff258f9-bcc6-419d-ab99-be72a52acc96.jpg",
    preview: false
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/7cdfb468-48a6-4bfd-a642-b64d01639700.jpg",
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
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/395240f6-053f-4928-8704-2f79eb8f2b67.jpg",
    preview: false
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/7ea28b5b-241f-4167-9c1c-6a913b4ddac9.jpg",
    preview: false
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/5d3c2fc0-483f-41bc-a618-02260ec3a926.jpg",
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
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/d49ae55b-5cf8-47f9-b6c6-00661267ca53.jpg",
    preview: false
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/942254d1-0eb2-4758-a610-74e6bd25f83d.jpg",
    preview: false
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/5627d160-1b30-4e8a-b992-3ec3b3f7e27b.jpg",
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
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/4939cba9-8dec-493a-96c0-12c2220fad99.jpg",
    preview: false
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/e835953d-dda2-4037-9bb2-da7b081fdc28.jpg",
    preview: false
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/9bd577b0-f890-4d04-9a27-1e020b4a0e04.jpg",
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
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-22453073/original/00aeaa12-60ae-4027-8c44-9a4e292a49a7.jpeg",
    preview: false
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-22453073/original/fc1af8ba-632c-4f57-a80a-d38dd426aa56.jpeg",
    preview: false
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-22453073/original/00560d42-c0d0-4385-83ef-2e7a8e2c7919.jpeg",
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
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-45727406/original/0e0c42bf-5184-4111-b8c6-ca7f4797bff6.jpeg",
    preview: false
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-45727406/original/26228dfb-f603-492e-a3c2-4e917d34836a.jpeg",
    preview: false
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-45727406/original/1d45b8e7-0931-4cc6-9c13-4401c0b58e74.jpeg",
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
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/11ccf056-9658-449d-b082-ee87423f38a8.jpg",
    preview: false
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/7ace522d-959a-4a8a-839b-9645a9e97213.jpg",
    preview: false
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/20015a62-7fb9-40e8-b502-6233adad7147.jpg",
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
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-644487931421139781/original/bcd884bc-8f06-4eea-921f-4ff046f540fa.jpeg",
    preview: false
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/63551843/d4006334_original.jpg",
    preview: false
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/50210487-4db7-4471-a611-51338afa4788.jpg",
    preview: false
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/f906fe29-49de-4375-a485-a8148c5e0de0.jpg",
    preview: true
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/689e187a-bc63-4cd7-8e32-7d9abfbebd23.jpg",
    preview: false
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/6c182540-1dfb-41dd-b039-92d184d8e488.jpg",
    preview: false
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/ece29b74-bc5c-4cb3-9a68-f16c0b9405b1.jpg",
    preview: false
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/032f2b84-c28d-4eca-b9ff-77aac7e6f26f.jpg",
    preview: false
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-46220931/original/bdc05466-e6b8-4954-beb9-ecd12b436dc7.jpeg",
    preview: true
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-46220931/original/32c005ea-1fae-4cab-af6d-53b63a3cb9c8.jpeg",
    preview: false
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-46220931/original/318b4d7a-ee12-48b5-97a0-332c6296f1c8.jpeg",
    preview: false
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-46220931/original/18db45e8-5800-4d9e-a777-00c37bb91868.jpeg",
    preview: false
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-46220931/original/ae0113a8-8d35-4aeb-ac3c-8f7fc18d68c3.jpeg",
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
