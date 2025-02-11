const mongoose = require("mongoose");
const dotenv = require('dotenv');
const env =  dotenv.config();

const URL = process.env.DB_URL;

const connectToDB = async () =>{
    try {
        await mongoose.connect(URL)
        console.log('DB Conneted Successfully.');
    } catch (error) {
        console.error('DB Connection Error!!!')
        process.exit(0);
    }
}

module.exports = connectToDB;