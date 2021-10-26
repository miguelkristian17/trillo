const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/local', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    console.log("MongoDB Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
