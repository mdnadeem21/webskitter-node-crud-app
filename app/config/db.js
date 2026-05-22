const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected sucessfully...`)
    } catch (error) {
        console.log(`Error in MongoDB connection : ${error}`)
    }
}

module.exports = connectDB