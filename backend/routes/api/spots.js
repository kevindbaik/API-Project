const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { Review } = require('../../db/models');
const { User } = require('../../db/models');

const router = express.Router();

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid address.'),
  check('city')
    .exists( {checkFalsy: true })
    .withMessage('Please provide a valid city.'),
    check('state')
    .exists( {checkFalsy: true })
    .withMessage('Please provide a valid state.'),
  check('country')
    .exists( {checkFalsy: true })
    .withMessage('Please provide a valid country.'),
  check('lat')
    .exists( {checkFalsy: true })
    .isNumeric()
    .withMessage('Please provide a valid latitude.'),
  check('lng')
    .exists( {checkFalsy: true })
    .isNumeric()
    .withMessage('Please provide a valid latitude.'),
  check('name')
    .exists( {checkFalsy: true })
    .withMessage('Please provide a valid name.'),
  check('description')
    .exists( {checkFalsy: true })
    .withMessage('Please provide a valid description.'),
  check('price')
    .exists( {checkFalsy: true })
    .withMessage('Please provide a valid price.'),
    handleValidationErrors
];


// get all spots
router.get('/',
async(req, res) => {
  const spots = await Spot.findAll({
    include: [{ model: SpotImage }, { model: Review }]
  });

  let allSpots = [];
  spots.forEach(spot => {
    allSpots.push(spot.toJSON())
  });

  // get average stars
  allSpots.forEach(spot => {
    spot.avgStars = 0;
    spot.Reviews.forEach(review => {
        spot.avgStars += review.stars;
    })
      spot.avgStars = spot.avgStars / spot.Reviews.length
      delete spot.Reviews;
  });

  // get preview Image
  allSpots.forEach(spot => {
    spot.SpotImages.forEach(image => {
      if(image.preview) {
        spot.previewImage = image.url
      }
    })
    if(!spot.previewImage) {
      spot.preview = 'No preview image.'
    }
    delete spot.SpotImages;
  })

  res.status(200);
  return res.json({Spots: allSpots})
});

// get all spots owned by current user
router.get('/current',
requireAuth,
async(req, res) => {
  const { user } = req;

  const spots = await Spot.findAll({
    where: {
      ownerId: user.id
    },
    include: [SpotImage, Review]
  });


  let allSpots = [];
  spots.forEach(spot => {
    allSpots.push(spot.toJSON())
  });

  // get average stars
  allSpots.forEach(spot => {
    spot.avgStars = 0;
    spot.Reviews.forEach(review => {
        spot.avgStars += review.stars;
    })
      spot.avgStars = spot.avgStars / spot.Reviews.length
      delete spot.Reviews;
  });

  // get preview Image
  allSpots.forEach(spot => {
    spot.SpotImages.forEach(image => {
      if(image.preview) {
        spot.previewImage = image.url
      }
    })
    if(!spot.previewImage) {
      spot.preview = 'No preview image.'
    }
    delete spot.SpotImages;
  })


  if(spots.length) {
    res.status(200)
    return res.json({Spots: allSpots})
  } else {
    res.status(404)
    return res.json({message: 'User does not own any spots.'})
  };
})

//get details of a spot from an id
router.get('/:spotId', async(req, res) => {
  let spot = await Spot.findByPk(req.params.spotId)
  if(!spot) {
    res.status(404);
    res.json({message: 'Spot couldn\'t be found.'})
  }
  spot = spot.toJSON();

  let reviews = await Review.findAll({ where: {spotId: req.params.spotId }});

  let reviewJSON = [];
  reviews.forEach(review => {
    reviewJSON.push(review.toJSON())
  });

  let numReviews = reviews.length;
  let sum = 0;
  reviewJSON.forEach(review => {
    sum += review.stars
  });
  let avgStars = sum / numReviews;
  spot.numReviews = numReviews;
  spot.avgStarRating = avgStars;

  let images = await SpotImage.findAll({ where: { spotId: req.params.spotId }, attributes: ['id', 'url', 'preview']});
  spot.SpotImages = images;

  let owner = await User.findByPk(spot.ownerId, {
    attributes: ['id', 'firstName', 'lastName']
  });
  spot.Owner = owner;

  res.json(spot)
})

// create a spot
router.post('/',
requireAuth,
validateSpot,
  async(req, res) => {
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if(user) {
    const createSpot = await Spot.create({
      ownerId: user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });
    res.status(200);
    return res.json(createSpot)
  } else {
    res.status(400);
    return res.json({ user: null })
  }
})

// edit a spot
router.put('/:spotId',
requireAuth,
validateSpot,
 async(req, res) => {
  let spot = await Spot.findByPk(req.params.spotId);

  const { user } = req;

  if(!user) {
    return res.json({ user: null })
  }

  if(!spot) {
    res.status(404);
    return res.json({message: 'Spot does not exist.'})
  };

  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  if(user) {
    if(user.id === spot.ownerId) {
      spot.address = address,
      spot.city = city,
      spot.state = state,
      spot.country = country,
      spot.lat = lat,
      spot.lng = lng,
      spot.name = name,
      spot.description = description,
      spot.price = price,

      await spot.save();

      res.status(200);
      res.json(spot)
    } else if (user.id !== spot.ownerId) {
      res.status(400);
      return res.json({message: 'User not authorized to make edit.'})
    }
  }
});

// delete a spot
router.delete('/:spotId',
requireAuth,
async(req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const { user } = req;

  if(!user) {
    return res.json({ user: null })
  };

  if(!spot) {
    res.status(404);
    return res.json({message: 'Spot does not exist.'})
  };

  if(user) {
    if(user.id === spot.ownerId) {
      await spot.destroy();

      res.status(200);
      return res.json({ message: 'Successfully deleted.'})
    } else if (user.id !== spot.ownerId) {
      res.status(400);
      return res.json({message: 'User is not authorized to delete.'})
    }
  }
})

module.exports = router;
