const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const newuser=require('./Routes/RegisterRoute')
const user=require('./Routes/userRoute')
const connectDb=require('./Database/db')


const corsOptions = {
  origin: ["http://localhost:5173", "https://rajacoirs.onrender.com"],
  credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json());

const port = process.env.PORT;
app.use('/newuser',newuser)
app.use('/user',user)

connectDb() 
app.listen(port, () => {
  console.log(`User Service is runnning in port ${port}`);
});
 