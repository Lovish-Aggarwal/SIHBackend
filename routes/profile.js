const express = require('express');
const router = express.Router();

const {check} = require('express-validator');
const { isSignedIn } = require('../controllers/authInstitute');
const { getUserById,updateUser,getUser} = require('../controllers/profile');





router.param('userId',getUserById);

router.put('/Aicte/:userId',isSignedIn,getUser);
router.put('/editAicte/:userId',isSignedIn,updateUser);
router.put('/editInstitute/:userId',isSignedIn,updateUser);
router.put('/editFaculty/:userId',isSignedIn,updateUser);

module.exports = router
