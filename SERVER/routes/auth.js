const express = require("express");
const router = express.Router();

const {check, validationResult } = require('express-validator')
const {signin,signup,signout, profSignup, profSignin} = require('../controllers/auth');



router.post(
    '/signup',
    [
        check("name","name should be atleast 3 characters").isLength({min:3})
    ],
    signup
);

router.post(
    '/signin',
    [
        check("email", "email is required").isEmail(),
        check("password", "password field is required").isLength({ min: 1 })
    ],
    signin
);

router.post(
    '/professors/signup',
    [
        check("name","name should be atleast 3 characters").isLength({min:3})
    ],
    profSignup
);

router.post(
    '/professors/signin',
    [
        check("email","Email is required").isEmail(),
        check("password", "password is required").isLength({min:3})
    ],
    profSignin
)

router.get('/signout', signout);



module.exports = router;