const express = require('express');
const { saveReport, reteriveReport } = require('../controllers/report');
const router = express.Router();

router.post('/saveReport',saveReport);
router.post('/reteriveReport',reteriveReport)

module.exports = router;