require('dotenv').config()
const mongoose = require('mongoose')

const DB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("🚀✨ MongoDB is connected successfully on localhost! 🔗💾");
            })
    } catch (error) {
        console.log('DB CONNECTION ERROR')
    }
}


module.exports = DB
