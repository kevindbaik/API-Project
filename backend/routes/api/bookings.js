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

// get all current users bookings
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
});

// update and return an existing booking
router.put('/:bookingId',
requireAuth,
async(req, res) => {
  const { user } = req;
  const { startDate, endDate } = req.body;

  const booking = await Booking.findByPk(req.params.bookingId);

  // VALIDATION FOR BOOKING EXISTS
  if(!booking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found"
    })
  };

  // VALIDATION FOR BOOKING BELONGS TO USER
  if(booking.userId !== user.id) {
    res.status(403);
    return res.json({
      message: "Forbidden. Booking does not belong to current user"
    })
  };

  const userStart = new Date(startDate);
  const userEnd = new Date(endDate);

  let numStart = userStart.getTime();
  let numEnd = userEnd.getTime();

  // VALIDATION FOR END DATE BEFORE START DATE
  if(numStart > numEnd) {
    res.status(400);
    return res.json({
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot be on or before startDate"
      }
    })
  };

  // VALIDATION FOR PAST BOOKINGS
  let currentDate = new Date();
  currentDate = currentDate.getTime();

  let pastCheck = new Date(booking.endDate);
  pastCheck = pastCheck.getTime();

  if(currentDate > pastCheck) {
    res.status(403);
    return res.json({
      message: "Past bookings can't be modified"
    })
  };

  // VALIDATION FOR BOOKING CONFLICTS
  let conflict = false;
  const spot = await Spot.findByPk(booking.spotId);
  const spotBookings = await spot.getBookings();

  let spotBookingsJSON = [];
  spotBookings.forEach(booking => {
    spotBookingsJSON.push(booking.toJSON())
  });

  spotBookingsJSON.forEach(booking => {
    let formatStart = JSON.stringify(booking.startDate);
    formatStart = formatStart.slice(1,11);
    let bookedStart = new Date(formatStart);

    let formatEnd = JSON.stringify(booking.endDate);
    formatEnd = formatEnd.slice(1,11);
    let bookedEnd = new Date(formatEnd);

    bookedStart = bookedStart.getTime();
    bookedEnd = bookedEnd.getTime();
    if(bookedStart === numStart || bookedEnd === numEnd) console.log('x')
  });

  if(conflict) {
    res.status(403);
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
    })
  }


})

module.exports = router;
