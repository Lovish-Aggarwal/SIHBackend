const express = require('express');
const { eventByAicte, eventByFaculty, eventConfirmedByInstitute,getEventById, eventConfirmedByAicte } = require('../controllers/events');
const router = express.Router();

router.param('eventId',getEventById);

router.post('/byAicte',eventByAicte)
router.post('/byFaculty',eventByFaculty)
router.post('/confirmedByInstitute/:eventId',eventConfirmedByInstitute)
router.post('/confirmedByAicte/:eventId',eventConfirmedByAicte);

module.exports = router;