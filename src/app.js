/**
 * Configuración principal de la aplicación Express.
 * 
 * Este módulo inicializa la aplicación Express, configura el middleware para
 * procesar solicitudes JSON y define las rutas principales del microservicio.
 * 
 * Rutas:
 *   - /api/songs: Gestiona las operaciones CRUD sobre canciones.
 */
const express = require("express");
const app = express();
const songRoutes = require("./routes/songRoutes");

// Middleware para parsear solicitudes JSON
app.use(express.json());
// Rutas para la gestión de canciones
app.use("/api/songs", songRoutes);

module.exports = app;