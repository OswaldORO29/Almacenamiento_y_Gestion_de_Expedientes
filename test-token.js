require('dotenv').config();
const jwt = require('jsonwebtoken');

// Esto leerá la clave secreta directamente de tu archivo .env actual
const secreto = process.env.APP_TOKEN_SECRET; 

if (!secreto) {
    console.log("¡ERROR! Node no está leyendo tu .env. Revisa la ruta.");
} else {
    const token = jwt.sign({ app: 'oficial' }, secreto);
    console.log("Copia este token exacto en Postman:");
    console.log(token);
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJvZmljaWFsIiwiaWF0IjoxNzg0Mjk5MDYzfQ.qI4FFh-1i7z6oNEeb9BPLi_Y33QtUG6pwInO2BK5Jwo