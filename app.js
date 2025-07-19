const express = require('express')
const app =express()
const userRouter = require('./routes/user.routes.js')
const database = require('./config/db.js')
const bcrypt = require('bcrypt');


database()//for database connectivity 

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/user',userRouter)
app.listen(3000,()=>{
    console.log("SERVER IS STARTED")
})