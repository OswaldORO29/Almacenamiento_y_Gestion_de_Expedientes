const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.warn('MONGO_URI no está configurada. La app arrancará sin conexión a MongoDB.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Successful connection to MongoDB');
    } catch (error) {
        console.error('Error connection MongoDB', error.message);
        throw error;
    }
};

module.exports = connectDB;