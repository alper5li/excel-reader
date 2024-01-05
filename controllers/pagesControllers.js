/* eslint-disable no-restricted-globals */
const { application, response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const e = require('express');
const loginPage = require('../templates/views/login.hbs');
const User = require('../public/js/user');

const path = __dirname;


const grabUser = async (req,res,next) =>
{
    try
    {
        const {token} = req.cookies;
        if(!token)
        {
            return res.status(202).json({
                message: "No user logged in. Please log in"
            })
        }
        const decodedToken = jwt.verify(token,
            'a4gscv3Fhas54nghAfcvczxcXCdfrhedR')
        if(!decodedToken)
        {
            res.status(202).json(
                {
                    message : "Token not valid. Please log in."
                }
            )
        }
        const user = await User.findById(decode.userId)
        res.status(200).json({
            message:'User authenticated.',
            user:
            {
                Id:user.Id,
                email:user.email,
            }
        })
    }
    catch(error)
    {
        if(!error.statusCode) error.statusCode=500;
        res.status(status).json({error: error.data})
    }
    
}

const signUp=async(req,res,next)=>
{
try {
    const hashedPW = bcrypt.hashSync(req.body.password,12)
    const user = new User({
        email:req.body.email,
        password:hashedPW
    })
    await user.save();

    const token=jwt.sign(
    {
        email:user.email,
        userId:user.Id.toString
    },
    'a4gscv3Fhas54nghAfcvczxcXCdfrhedR',
    {expiresIn:'2h'});

    res.status(200)
    .cookie('token',token,{httpOnly:true})
    .json({message:'User Created.'})

}
catch(error)
{
    console.log(error);
}
}


const login= async(req,res,next)=>
{
    res.render('login')
    try
    {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('Validation failed')
            err.statusCode = 422;
            err.data=errors.array();
            throw err;
        }

        const user = await User.findOne(
            {email:req.body.email}
        )
        const token = jwt.sign({
            email:user.emai,
            userID: user.Id.toString()
        },'a4gscv3Fhas54nghAfcvczxcXCdfrhedR',
        {expiresIn:'2h'})

        res.status(200)
        .cookie('token',token,{httpOnly:true})
        .json({message:"User logged in."})
    }
    catch{e}
    {
       const status = e.statusCode ||500;
       res.status(status).json({error: e.data})
       
    }
    
    
    
}


const home=(req,res)=>
{
    res.redirect(200,"localhost:3000/login");
}

const auth=(req,res)=>{
    // database check 
    // if yes res.render('home'); 
    // if no res.render('404');
    res.render('home')
}


const x=(req,res)=>{
    res.render('home')
}
module.exports = {
    home,
    login,
    auth,
    signUp,
    grabUser,
    x
}

/*
const show = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query("SELECT * FROM students", (err, data) => {
            if (err) throw err;
            res.render('show', { data })
        })
    })

    res.render('show');
}
*/