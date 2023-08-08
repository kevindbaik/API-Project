const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot } = require('../../db/models');
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
    .withMessage('Please provide a valid latitude.'),
  check('lng')
    .exists( {checkFalsy: true })
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
router.get('/', async(req, res) => {
  const allSpots = await Spot.findAll();

  res.status(200);
  return res.json(allSpots)
});

// create a spot
router.post('/new',
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
})

module.exports = router;
