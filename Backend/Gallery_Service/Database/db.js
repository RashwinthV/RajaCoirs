const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGOURI;

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB ");
  } catch (error) {
    console.error(`Error in connecting to Database: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDb;
