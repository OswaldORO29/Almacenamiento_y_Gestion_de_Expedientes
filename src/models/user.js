const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// CORREGIDO: Eliminamos 'next' de los parámetros y del cuerpo de la función.
// Mongoose resolverá la promesa automáticamente al terminar el 'await'.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return; // Usamos un 'return' simple para salir de la función
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);