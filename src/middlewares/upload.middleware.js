const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido en cabeceras. Solo JPG, PNG o PDF.'));
  }
};

const uploadMiddleware = multer({
  storage: storage,
  limits: { 
    fileSize: 2 * 1024 * 1024 
  },
  fileFilter: fileFilter
});

module.exports = uploadMiddleware;