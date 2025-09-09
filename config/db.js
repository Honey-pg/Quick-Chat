const mongoose = require('mongoose');
require("dotenv").config();
exports.connectDB =() => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {console.log(`Connected to MongoDB ${process.env.PORT}`)})
    .catch((error)=>{
        console.log(error.message);
        console.log("db failed");
        process.exit(1); // Exit with failure
    })
}
