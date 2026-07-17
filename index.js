require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./src/config/database');
const expedienteRoutes = require('./src/routes/expendientesroutas');
const authRoutes = require('./src/routes/auth.routes');

// 1. Importar el nuevo middleware
const verifyAppToken = require('./src/middlewares/appToken.middleware');

app.use(express.json());

// 2. Usar el middleware de manera global
// Cualquier ruta declarada DESPUÉS de esta línea requerirá el header 'app-token'
app.use(verifyAppToken);

app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'API de expedientes funcionando' });
});

app.use('/api/auth', authRoutes);
app.use('/api/expedientes', expedienteRoutes);

connectDB().catch((error) => {
    console.error('No se pudo conectar a MongoDB:', error.message);
});

app.listen(PORT, () => {
    console.log('Hello World');
    console.log(`Server listening on port ${PORT}`);
});