const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
  
      
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,

    }

})

const user = mongoose.model("user",userSchema)

module.exports = user
