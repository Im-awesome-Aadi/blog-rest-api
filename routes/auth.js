const express = require('express');
const {check, body} = require('express-validator')

const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup',[
    check('email').isEmail().withMessage('Enter a valid Email').normalizeEmail(),
    body('password','Please Enter a password with minimum length of 6')
    .trim()
    .isLength({min:6, max:20}),
    body('name','Name should be atleast 5 with only alphanumeric characters').isAlphanumeric().trim().not().isEmpty().isLength({min:5,max:15})

/* body('confirmPassword').trim().custom((value,{req})=>{
    if(value!==req.body.password){
        throw new Error("Password didn't match")
    }
    return true
}) */

],authController.signup)

router.post('/login',[
    check('email').isEmail().withMessage('Enter a valid Email').normalizeEmail(),
    body('password','Please Enter a password with minimum length of 6')
    .trim()
    .isLength({min:6, max:20}),
    
],authController.login)
module.exports = router;
