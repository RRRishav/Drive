require('dotenv').config()
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const userModel = require('../models/user.model.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register',
    body('email').trim().isEmail().isLength({ min: 6 }),
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid ddata'
            })
        }
        console.log(errors)

        const { email, username, password } = req.body;


        const hashPassword = await bcrypt.hash(password, 10);



        const newUsser = await userModel.create({
            email,
            username,
            password: hashPassword,
        })




        res.json(newUsser)


        console.log(req.body);
        // res.send('user register')
    })


router.get('/login', (req, res) => {
    res.render('login')
})


router.post('/login',
    body('username').trim().isLength({ min: 6 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                error: errors.array(),
                message:'Invalid data'
            })
        }

        const {username,password} = req.body

        const user= await userModel.findOne({
            username:username
        })


        if(!user){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }


        const IsMatch = await bcrypt.compare(password,user.password)

        if(!IsMatch){
            return res.status(400).json({
                message:"username and password is incorrect"
            })
        }

        
        const token = jwt.sign({
            userId:user._id,
            email:user.email,
            username:user.username
        },
       process.env.JWT_SECRET,
    )

       res.cookie('token',token,)
       res.send('Logged in')
    })

module.exports = router 