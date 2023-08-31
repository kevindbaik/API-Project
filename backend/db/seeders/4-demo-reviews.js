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
    review: 'Not a great stay. Kitchen was a little too small, and fridge was not working properly.',
    stars: 2
  },
  {
    spotId: 3,
    userId: 1,
    review: 'The atmosphere was very pleasant, however the bedsheets were very dirty. All in all it was an okay experience.',
    stars: 3
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
    review: 'A fun stay. Waking up in the middle of the woods and being surrounded by trees everywhere is such an awesome feeling.',
    stars: 4
  },
  {
    spotId: 4,
    userId: 1,
    review: 'Wonderful, cozy little spot. Enjoyed my time here and will be coming back.',
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
    stars: 1
  },
  {
    spotId: 2,
    userId: 3,
    review: 'Perfect. Location could not have been any better. A great time with a great atmosphere.',
    stars: 5
  },
  {
    spotId: 1,
    userId: 6,
    review: 'Home looked nothing like the pictures. Area was very small and could barely fit 3 people. Unless you\'re coming alone, I would avoid.',
    stars: 2
  },
  {
    spotId: 1,
    userId: 7,
    review: 'As others have stated, this treehouse looks nice from the outside. The inside however... a mess. Stay away.',
    stars: 1
  },
  {
    spotId: 1,
    userId: 8,
    review: 'Too small. Not much to do on site and we had to drive 30 mins to find fun something to do. Look elsewhere if you plan on renting a treehome.',
    stars: 2
  },
  {
    spotId: 2,
    userId: 10,
    review: 'Gorgeous treehome! Absolutely would recommend coming here with friends or family because it is an experience of a lifetime.',
    stars: 5
  },
  {
    spotId: 2,
    userId: 6,
    review: 'Brought my parents here because they\'ve experienced a night in a treehouse. They loved it!',
    stars: 4
  },
  {
    spotId: 2,
    userId: 7,
    review: 'The view is amazing at night. So much fun! Kevin was very welcoming and accommodating too. ',
    stars: 5
  },
  {
    spotId: 2,
    userId: 8,
    review: 'This treehome was located right in the middle of a huge ranch. The interior was beautiful and watching the sunset on top of a tree was a once in a lifetime experience.',
    stars: 5
  },
  {
    spotId: 3,
    userId: 6,
    review: 'A nice treehome, however I wish the owner cared more about keeping the place clean.',
    stars: 3
  },
  {
    spotId: 3,
    userId: 10,
    review: 'It was a good time. We really enjoyed the hot tub and firepit at night. Only negative was the place is kinda dirty.',
    stars: 4
  },
  {
    spotId: 3,
    userId: 9,
    review: 'Bridge was pretty. That\'s about it though, nothing special outside of that.',
    stars: 3
  },
  {
    spotId: 4,
    userId: 7,
    review: 'I decided I needed a getaway for the weekend to wind down from work. This was the perfect spot! View was gorgeous and the interior is so nice.',
    stars: 5
  },
  {
    spotId: 4,
    userId: 6,
    review: 'A wonderful spot to stay at for one or two people. Being able to see the sunset while laying on a bed outside is a vibe.',
    stars: 4
  },
  {
    spotId: 4,
    userId: 9,
    review: 'Very aesthetically pleasing treehome. I love wood themed designs and this home executed that perfectly.',
    stars: 5
  },
  {
    spotId: 5,
    userId: 9,
    review: 'Best treehouse I have ever stayed at. Huge amounts of space and connecting bridge makes it easy to get to other location.',
    stars: 5
  },
  {
    spotId: 5,
    userId: 6,
    review: 'I brought my kids here to spend the weekend. We had a blast!',
    stars: 4
  },
  {
    spotId: 5,
    userId: 10,
    review: 'Thanks Kevin for the great stay. Wonderful place with a second treehouse connected by a bridge. Would recommend if this is your first time doing something like this.',
    stars: 5
  },
  {
    spotId: 5,
    userId: 8,
    review: 'As someone who loves trees and studies different wood types, staying at a treehouse made of Douglas Fir is a once in a lifetime opportunity.',
    stars: 5
  },
  {
    spotId: 6,
    userId: 6,
    review: 'Fun weekend in this cozy little home. Only downside is there isn\'t much to do around the location.',
    stars: 3
  },
  {
    spotId: 6,
    userId: 7,
    review: 'One word to describe this home is.... comfy. Had a good time, wish it was a little bit more spacious though.',
    stars: 3
  },
  {
    spotId: 6,
    userId: 8,
    review: 'Nice treehome. Nothing too special, and location wasn\'t the best, but it was okay.',
    stars: 3
  },
  {
    spotId: 7,
    userId: 7,
    review: 'Greatest treehouse in the world. If I could live here permanently I would.',
    stars: 5
  },
  {
    spotId: 7,
    userId: 10,
    review: 'Insane treehouse bro. Speechless.',
    stars: 5
  },
  {
    spotId: 7,
    userId: 1,
    review: 'I don\'t think I have ever seen a treehouse as impressive as this one. Not only is the interior something you see in movies, but the location and atmosphere are incredible.',
    stars: 5
  },
  {
    spotId: 7,
    userId: 9,
    review: 'I decided to have my birthday weekend here with a couple friends. I could NOT have picked a better place.',
    stars: 5
  },
  {
    spotId: 7,
    userId: 6,
    review: 'HELLO IF YOU\'RE READING THIS AND ARE CONSIDERING BOOKING A STAY HERE, DO IT NOW!!! YOU WILL NOT REGRET IT.',
    stars: 5
  },
  {
    spotId: 8,
    userId: 10,
    review: 'Please avoid this location. Despite the cheap price, I can assure you it is not worth it.',
    stars: 1
  },
  {
    spotId: 8,
    userId: 7,
    review: 'I saw the price and thought.. Wow! What a steal! Turns out, you couldn\'t pay me to stay here.',
    stars: 1
  },
  {
    spotId: 8,
    userId: 9,
    review: 'I have contacted support and will be requesting a refund shortly. This should be illegal.',
    stars: 1
  },
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
