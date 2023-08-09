const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { Review } = require('../../db/models');
const { User } = require('../../db/models');
const { ReviewImage } = require('../../db/models');

const router = express.Router();


// get all reviews of the current user
router.get('/current',
requireAuth,
async(req, res) => {
  const { user } = req;

  const reviews = await Review.findAll({
    where: {userId: user.id},
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: {
          model:SpotImage
        }
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });

  if(reviews.length === 0) {
    res.status(404)
    return res.json({message: 'No reviews found for current user.'})
  }


  let reviewJSON = [];
  reviews.forEach(review => {
    reviewJSON.push(review.toJSON())
  });

  reviewJSON.forEach(review => {
    for(let key in review.Spot) {
      review.Spot.SpotImages.forEach(spot => {
        if(spot.preview) {
          review.Spot.previewImage = spot.url
        }
      })
    }
    delete review.Spot.SpotImages
  })


  res.json({Reviews: reviewJSON})

})







module.exports = router;
