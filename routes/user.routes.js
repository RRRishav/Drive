const express = require('express')
const router = express.Router()
const {body,validationResult} = require('express-validator')

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',
    body('email').trim().isEmail().isLength({min:6}),
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),
    (req,res)=>{

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
      return res.send('INVALID DATA')
    }
   // console.log(errors)

    console.log(req.body);
    res.send('user register')
})


module.exports = router 