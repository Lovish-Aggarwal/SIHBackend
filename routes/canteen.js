const express = require("express");
const { createCanteen, getAllCanteen, enterId, bookCanteen } = require("../controllers/canteen");

const router = express.Router();

router.param('canteenId',enterId)

router.post('/createCanteen',createCanteen)
router.get('/getAllCanteen',getAllCanteen)
router.post('/bookCanteen/:canteenId',bookCanteen)

module.exports = router;