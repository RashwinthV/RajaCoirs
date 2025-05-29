// image-service/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./Database/db');

const path = require('path');
const imageRoutes = require('./routes/ImageRoutes');

const app = express();

app.use(cors()); // allow frontend requests
app.use(express.json());
connectDB();

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Image API routes
app.use('/images', imageRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Image service running on port ${PORT}`));
 