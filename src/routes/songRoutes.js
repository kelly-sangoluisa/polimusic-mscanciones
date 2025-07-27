/**
 * Rutas para la gestión de canciones (TBL_SONG).
 * 
 * Este módulo define los endpoints RESTful para las operaciones CRUD sobre canciones,
 * delegando la lógica de negocio a los controladores correspondientes.
 * 
 * Endpoints:
 *   GET    /api/songs         - Obtiene todas las canciones
 *   GET    /api/songs/:id     - Obtiene una canción por ID
 *   POST   /api/songs         - Crea una nueva canción
 *   PUT    /api/songs/:id     - Actualiza una canción existente
 *   DELETE /api/songs/:id     - Elimina una canción por ID
 */
const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
} = require("../controllers/songController");


router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.post("/", createSong);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);

module.exports = router;