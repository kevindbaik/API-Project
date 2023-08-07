const express = require('express');
const router = express.Router();

const { Spot } = require('../../db/models')

router.get('/', async(req, res) => {
  const allSpots = await Spot.findAll();

  res.status(200);
  return res.json(allSpots)
})

module.exports = router;
