require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./src/config/database');


const expedienteRoutes = require('./src/routes/expendientesroutas');

connectDB();

app.use('/api/expedientes', expedienteRoutes);


app.listen(PORT, () => {
    console.log('Hello World');
    console.log(`Server listening on port ${PORT}`);
});