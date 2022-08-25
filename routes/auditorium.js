const express = require("express");
const { createAuditorium, getAllAuditorium, enterId, bookAuditorium } = require("../controllers/auditorium");

const router = express.Router();

router.param('audiId',enterId)

router.post('/createAuditorium',createAuditorium)
router.get('/getAllAuditorium',getAllAuditorium)
router.post('/bookAuditorium/:audiId',bookAuditorium)
module.exports = router;