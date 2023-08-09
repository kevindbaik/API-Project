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

  res.status(200);
  return res.json({Reviews: reviewJSON})
})

router.post('/:reviewId/images',
requireAuth,
async(req, res) => {
  const { user } = req;
  const { url } = req.body;

  let review = await Review.findByPk(req.params.reviewId, {
    include: ReviewImage
  });

  if(!review) {
    res.status(404);
    return res.json({message: "Review couldn't be found"})
  }

  if(user.id !== review.userId) {
    res.status(403);
    return res.json({message: 'Review does not belong to user'})
  }

  if(review.ReviewImages.length < 10) {
  let reviewImage = await review.createReviewImage({
    reviewId: req.params.reviewId,
    url
  });

  await reviewImage.save();
  let response = {};
  response.id = reviewImage.id;
  response.url = reviewImage.url;

  res.status(200);
  return res.json(response)
} else if (review.ReviewImages.length >= 10) {
  res.status(403);
  return res.json({"message": "Maximum number of images for this resource was reached"})
  }
})






module.exports = router;
