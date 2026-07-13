const mongoose = require('mongoose');

const expedienteSchema = new mongoose.Schema({

  originalName: {
    type: String,
    required: true,
    trim: true
  },
  

  fileName: {
    type: String,
    required: true,
    unique: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  mimeType: {
    type: String,
    required: true
  },
  

  size: {
    type: Number,
    required: true,
    max: 2097152 
  },
  
  storagePath: {
    type: String,
    required: true,
    select: false 
  }
}, {

  timestamps: true,

  versionKey: false 
});

module.exports = mongoose.model('Expediente', expedienteSchema);