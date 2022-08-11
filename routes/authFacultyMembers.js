const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {signup, signin, isSignedIn, signout} = require('../controllers/authFacultyMembers')

router.post('/signup',
[
   check('email',"email is not valid").isEmail(),
   check('password',"password should be atleast 3 characters").isLength({min:3})
],
signup)


router.post('/signin',
[
   check('email',"email is not valid").isEmail(),
   check('password',"password should be atleast 3 characters").isLength({min:3})
],
signin)

// router.get('/test',isSignedIn,isAuthorised,(req,res)=>{
//    console.log(req.auth)
//    res.send("Protected route here");
// })

router.get('/signout',signout);

module.exports = router;
