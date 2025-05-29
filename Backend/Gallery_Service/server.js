// image-service/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./Database/db');

const path = require('path');
const image = require('./Routes/ImageRoutes');

const app = express();

const corsOptions = {
  origin: ["http://localhost:5174","https://rajacoirs.onrender.com"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
connectDB();

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Image API routes
app.use('/images', image);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Image service running on port ${PORT}`));
 