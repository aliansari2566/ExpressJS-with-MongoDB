const mongoose = require("mongoose")
require("dotenv").config();
// const DB_URI = process.env.DB_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected");
    } catch (error) {
        console.log("Error while connecting: " + error.message);
    }
}

module.exports = connectDB;
