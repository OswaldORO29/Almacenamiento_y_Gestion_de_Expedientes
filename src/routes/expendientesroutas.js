const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/upload.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const { uploadExpediente } = require('../controllers/expendientescontrol');
router.post(
  '/upload', 
  authMiddleware,
  uploadMiddleware.single('documento'), 
  uploadExpediente
);

router.use((error, req, res, next) => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ 
      error: 'Seguridad: El archivo excede el límite máximo permitido de 2MB.' 
    });
  }
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
});

module.exports = router;