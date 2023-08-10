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

router.delete('/:imageId',
requireAuth,
async(req, res) => {
  const { user } = req;
  const spotImage = await SpotImage.findByPk(req.params.imageId);
  const spot = await spotImage.getSpot();

  if(!spotImage) {
    res.status(404);
    return res.json({ "message": "Spot Image couldn't be found" })
  };

  if(user.id !== spot.ownerId) {
    res.status(403);
    return res.json({message: "Forbidden: spot does not belong to user"})
  };

  if(user.id === spot.ownerId) {
    await spotImage.destroy();

    res.status(200);
    return res.json({"message": "Successfully deleted"})
  }
})



module.exports = router;
