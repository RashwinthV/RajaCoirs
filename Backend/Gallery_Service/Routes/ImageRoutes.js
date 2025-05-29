const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadImage, getImages } = require('../Controller/imageController');
const auth = require('../Middlewares/Authmiddlewares');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post('/upload', auth, upload.single('image'), uploadImage);
router.get('/getImage', auth, getImages);

module.exports = router;
