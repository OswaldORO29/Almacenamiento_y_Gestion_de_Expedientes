const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Expediente = require('../models/expendiente');

const uploadExpediente = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: 'No se ha seleccionado ningún archivo.' });
    }

    const buffer = req.file.buffer;

    const { fileTypeFromBuffer } = await import('file-type');
    const detectedType = await fileTypeFromBuffer(buffer);

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];


    if (!detectedType || !allowedMimeTypes.includes(detectedType.mime)) {
      return res.status(415).json({
        error: 'Seguridad: El contenido real del archivo no coincide con un formato permitido (Solo JPG, PNG, PDF).'
      });
    }


    const fileExtension = detectedType.ext;
    const secureFileName = `${uuidv4()}.${fileExtension}`; 
    

    const uploadDirectory = path.join(__dirname, '../../private_uploads');
 
    await fs.mkdir(uploadDirectory, { recursive: true });
    
    const finalStoragePath = path.join(uploadDirectory, secureFileName);


    await fs.writeFile(finalStoragePath, buffer);

    const nuevoExpediente = new Expediente({
      originalName: req.file.originalname,
      fileName: secureFileName,
      mimeType: detectedType.mime,
      size: req.file.size,
      storagePath: finalStoragePath 
    });

    await nuevoExpediente.save();


    return res.status(201).json({
      message: 'Archivo verificado y almacenado de forma segura.',
      fileId: nuevoExpediente._id,
      fileName: secureFileName
    });

  } catch (error) {
    console.error('Error en File Upload:', error);
    return res.status(500).json({ error: 'Error interno al procesar el archivo.' });
  }
};

module.exports = { uploadExpediente };