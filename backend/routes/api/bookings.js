const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { Review } = require('../../db/models');
const { User } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { Booking } = require('../../db/models');

const router = express.Router();


router.get('/current',
requireAuth,
async(req, res) => {
  const { user } = req
  const bookings = await Booking.findAll({
    where: {userId: user.id},
    include: [
      {
        model: Spot,
        attributes: { exclude: ['updatedAt', 'createdAt']},
        include: [SpotImage]
      }
    ]
  });

  let bookingsJSON = [];
  bookings.forEach(booking => {
    bookingsJSON.push(booking.toJSON())
  });

  bookingsJSON.forEach(booking => {
    for(let key in booking.Spot) {
      booking.Spot.SpotImages.forEach(spot => {
        if(spot.preview) {
          booking.Spot.previewImage = spot.url;
        }
      })
    }
    delete booking.Spot.SpotImages
  })

  res.json({Bookings: bookingsJSON})
})

module.exports = router;
