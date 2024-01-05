const { Router } = require('express');
const express = require('express');
const {body} = require('express-validator');
const controller = require('../controllers/pagesControllers')
const User = require('../public/js/user')

const router = express.Router();




router.post('/signup',controller.signUp)

router.post('/login', [
    body('email')
    .isEmail()
    .withMessage('Enter valid email')
    .custom(value=>User.findOne({email:value})
        // eslint-disable-next-line consistent-return
        .then(foundUser =>{
            if(!foundUser)
            {
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('User not found.')
            }
        })),


    body('password')
    .notEmpty()
    .withMessage("Password fieldt can't be empty")
    .custom(async (value, {req})=>{
        const user = await User.findOne({email: req.body.email})
        const isEqual = await bcrypt.compare(value,user.password)
        if(!isEqual){
            return Promise.reject('Incorrect Password')
        }
    })
], controller.login)

router.get('/',controller.x)
router.get('/grabuser',controller.grabUser);

module.exports = router;