const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { Review } = require('../../db/models');
const { ReviewImage } = require('../../db/models');

const router = express.Router();

router.delete('/:imageId',
requireAuth,
async(req, res) => {
  const { user } = req;
  const reviewImage = await ReviewImage.findByPk(req.params.imageId);

  if(!reviewImage) {
    res.status(404);
    return res.json({"message": "Review Image couldn't be found"})
  };

  const review = await reviewImage.getReview();
  if(review.userId !== user.id) {
    res.status(403);
    return res.json({"message": "Forbidden: review does not belong to user"})
  };

  if(review.userId === user.id) {
    await reviewImage.destroy();

    res.status(200);
    res.json({"message": "Successfully deleted"})
  }
})

module.exports = router;
