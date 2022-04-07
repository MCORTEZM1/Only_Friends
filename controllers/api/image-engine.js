const multer = require('multer');

const imageStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
  
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      
      cb(null, Date.now() + '--' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file based on type 
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // accept the image file
        cb(null, true);
    }
    else {
        cb(new Error('Filetype not accepted!'), false)
    }
};

const upload = multer({ 
    storage: imageStorageEngine, 
    limits: {
        // maximum image size of 5MB
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

module.exports = upload;