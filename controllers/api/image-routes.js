const router = require("express").Router();
const path = require('path');
const { User, Post, Comment, Channel } = require('../../models');
const multer = require('multer');

const imageStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    
    cb(null, Date.now()+ '--' + file.originalname);
  }
})

const upload = multer({ storage: imageStorageEngine });

// Get an image -> maybe a front end route? 
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"))
});

// // POST 1 single image
router.post('/single', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('Image file successfully uploaded');
});

// POST multiple images 
router.post('/multiple', upload.array('images', 3), (req, res) => {
  console.log(req.files);
  res.send('Multiple images uploaded succesfully');
});




module.exports = router; 