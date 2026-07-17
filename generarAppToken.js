    // generarAppToken.js
    const jwt = require('jsonwebtoken');
    require('dotenv').config(); 

    // Generamos un token sin expiración (o con una muy larga, ej: '10y')
    const appToken = jwt.sign(
        { origin: 'mi_aplicacion_oficial' }, 
        process.env.APP_TOKEN_SECRET
    );

    console.log("TU APP TOKEN ES:");
    console.log(appToken);

    //