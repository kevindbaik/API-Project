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
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    lat: 33.997,
    lng: -117.73,
    name: 'Sycamore Wood Treehouse',
    description: '250 sq ft treehouse with bed overlooking Silicon Valley. Kitchenette with sink, cooking stove, and mini fridge. Queen bed sleeps 4 people.',
    price: 300.00
  },
  {
    ownerId: 4,
    address: '301 Gloom Street',
    city: 'Baird',
    state: 'Texas',
    country: 'United States',
    lat: 34.963,
    lng: -119.02,
    name: 'Ryders Treehouse',
    description: '1 bedroom treehouse located in the middle of an 800 acre ranch. Includes bathroom, kitchen, refrigerator 2 burner gas cooktops, and a kitchen sink.',
    price: 200.00
  },
  {
    ownerId: 4,
    address: '1204 Pike Place',
    city: 'Nephi',
    state: 'Utah',
    country: 'United States',
    lat: 47.66,
    lng: -122.33,
    name: 'Fantasy Treehouse and Resort',
    description: 'Rustic cabin feel treehouse with two floors, kitchen, and patio. Second floor includes jetted hot-tub, a dine in pavillion, and fire pit for roasting marshmellows!',
    price: 226.00
  },
  {
    ownerId: 4,
    address: '1708 Olympic Avenue',
    city: 'Visalia',
    state: 'California',
    country: 'United States',
    lat: 33.99,
    lng: 11.22,
    name: 'Sierra Treehouse',
    description: 'This beautiful and unique treehouse will provide you a great getaway, whether you are visiting friends or family or headed to the National parks.',
    price: 355.00
  },
  {
    ownerId: 4,
    address: '3555 Maverick Street',
    city: 'White Salmon',
    state: 'Washington',
    country: 'United States',
    lat: 55.66,
    lng: -111.22,
    name: 'The Klickitikat Treehouse',
    description: '500 square foot alpine modern treehouse fully supported by Douglas Fir Trees. Fully furnished with AC, indoor and outdoor showers, kitchen, and a private jacuzzi.',
    price: 300.00
  },
  {
    ownerId: 4,
    address: '7214 Ludicus Road',
    city: 'North Bend',
    state: 'Washington',
    country: 'United States',
    lat: 34.66,
    lng: -112,
    name: 'Cedar Falls Treehouse',
    description: '150 square foot space with big picture windowws and bright interior. Sleeps two,includes Wi-Fi and 100 inch screen projector for watching movies.',
    price: 270.00
  },
  {
    ownerId: 2,
    address: '15240 Canon Lane',
    city: 'Aptos',
    state: 'California',
    country: 'United States',
    lat: 45.66,
    lng: -120.76,
    name: 'Peaceful Treehouse with Ocean View',
    description: 'Mid-century furniture and architecture details made of natural materials like wood and stone. Includes 3 bedrooms, a full bath, and a full kitchen with everything you need to make dinner for 6.',
    price: 500.00
  },
  {
    ownerId: 5,
    address: '12345 Demo Street',
    city: 'Arlington',
    state: 'Washington',
    country: 'United States',
    lat: 49.12,
    lng: -126.33,
    name: 'Stillaguamish River Treehouse',
    description: 'Treehouse can sleep up to 4 and has a kitchenette and toilet. Located right next to Stillaguamish River and includes free parking and picnic table for dining.',
    price: 155.00
  },
  {
    ownerId: 5,
    address: '21234 Demo Street',
    city: 'Pehastin',
    state: 'Washington',
    country: 'United States',
    lat: 19.12,
    lng: -126.33,
    name: 'Hansel Creek Treehouse',
    description: 'Includes BBQ grill, cold drinking water cistern, refrigerator, coffee maker, silverware, and heat!',
    price: 565.00
  },
  {
    ownerId: 1,
    address: '76456 Hush Forest',
    city: 'Sooke',
    state: 'British Columbia',
    country: 'Canada',
    lat: 23.12,
    lng: -126.33,
    name: 'West Sooke Treehouse',
    description: 'Spend the day hiking around the trails nearby, then finish the night by a warm fire or hot tub. A treehouse sleepover fit for adults.',
    price: 265.00
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
