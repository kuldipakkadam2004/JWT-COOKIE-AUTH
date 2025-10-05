const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection successfull...");
    }catch(err){
        console.log(err.message);
        console.log("connection failed");
    }
}

module.exports = {
    dbConnect
}
