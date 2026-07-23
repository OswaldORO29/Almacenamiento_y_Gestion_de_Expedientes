require('dotenv').config();
const express = require('express');
// const helmet = require('helmet'); // <-- 1. IMPORTAMOS HELMET AQUÍ

const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./src/config/database');
const expedienteRoutes = require('./src/routes/expendientesroutas');
const authRoutes = require('./src/routes/auth.routes');

// 1. Importar el nuevo middleware
const verifyAppToken = require('./src/middlewares/appToken.middleware');

// app.use(helmet()); // <-- 2. ACTIVAMOS HELMET AQUÍ (Antes que cualquier otra cosa)
app.use(express.json());

// 2. Usar el middleware de manera global

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