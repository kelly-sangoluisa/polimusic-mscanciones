/**
 * Punto de entrada principal del microservicio de canciones.
 * 
 * Este archivo carga las variables de entorno, inicializa la aplicación Express
 * y pone el servidor a escuchar en el puerto configurado. También define una ruta
 * raíz para verificar el estado del microservicio.
 * 
 * Variables de entorno:
 *   - PORT: Puerto en el que se ejecuta el servidor (por defecto 3000)
 */
require('dotenv').config();
const app = require('./src/app');

const port = process.env.PORT || 3000;

// Ruta raíz para verificación rápida del estado del microservicio
app.get('/', (req, res) => {
  res.send('Microservicio de CRUD de Canciones - Kelly Sangoluisa');
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
  console.log(`➡️  API: http://localhost:${port}/api/songs`);
});