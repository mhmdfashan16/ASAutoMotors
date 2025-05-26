// import multer from "multer";
// import path from 'path';

/*
const storage = multer.diskStorage({
    destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  }
  cb('Only .jpeg, .jpg, .png files allowed!');
};

export const upload = multer({
    storage: multer.diskStorage({}), 
    fileFilter,
    limits:{fileSize: 5 * 1024 * 1024}, //max 5MP

})

*/

import multer from 'multer';
import path from 'path';

// Save files in 'uploads/' folder temporarily
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;