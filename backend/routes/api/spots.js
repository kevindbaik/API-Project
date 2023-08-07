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

module.exports = router;
