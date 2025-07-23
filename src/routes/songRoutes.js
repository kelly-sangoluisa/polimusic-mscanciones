const express = require('express');
const SongController = require('../controllers/songController');

const router = express.Router();

// GET /api/songs - Obtener todas las canciones
router.get('/', SongController.getAllSongs);

// GET /api/songs/:id - Obtener canción por ID
router.get('/:id', SongController.getSongById);

// POST /api/songs - Crear nueva canción
router.post('/', SongController.createSong);

// PUT /api/songs/:id - Actualizar canción
router.put('/:id', SongController.updateSong);

// DELETE /api/songs/:id - Eliminar canción
router.delete('/:id', SongController.deleteSong);

module.exports = router;