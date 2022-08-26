const express = require("express");
const { createCanteen, getAllCanteen, enterId, bookCanteen, storeEventId } = require("../controllers/canteen");

const router = express.Router();

router.param('canteenId',enterId)

router.param('eventId',storeEventId)

router.post('/createCanteen',createCanteen)
router.get('/getAllCanteen',getAllCanteen)
router.post('/bookCanteen/:eventId/:canteenId',bookCanteen)

module.exports = router;