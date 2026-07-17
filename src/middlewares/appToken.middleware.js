const jwt = require('jsonwebtoken');

const verifyAppToken = (req, res, next) => {
    const token = req.headers['app-token'];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Acceso denegado. Token de aplicación no proporcionado.' 
        });
    }

    try {
        // Verificamos el JWT usando la misma clave secreta de tu .env
        const decoded = jwt.verify(token, process.env.APP_TOKEN_SECRET);
        req.appData = decoded; // Guardamos los datos del token por si los necesitas
        next();
    } catch (error) {
        return res.status(403).json({ 
            success: false, 
            message: 'Acceso denegado. Token de aplicación inválido o expirado.' 
        });
    }
};

module.exports = verifyAppToken;