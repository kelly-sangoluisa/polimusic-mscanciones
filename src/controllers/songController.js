/**
 * Controladores para la gestión de canciones (TBL_SONG).
 * 
 * Este módulo define las funciones controladoras que gestionan las operaciones
 * CRUD sobre la entidad Canción, recibiendo las peticiones HTTP y delegando
 * la lógica de acceso a datos al modelo correspondiente.
 * 
 * Cada función maneja los posibles errores y responde con el código HTTP adecuado.
 */
const {
  getAllSongsFromDB,
  getSongByIdFromDB,
  createSongInDB,
  updateSongInDB,
  deleteSongInDB,
} = require("../models/songModel");

/**
 * Controlador para obtener todas las canciones.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const getAllSongs = async (req, res) => {
  try {
    const songs = await getAllSongsFromDB();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener canciones", details: err.message });
  }
};

/**
 * Controlador para obtener una canción por su ID.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const getSongById = async (req, res) => {
  try {
    const song = await getSongByIdFromDB(req.params.id);
    if (!song) return res.status(404).json({ error: "Canción no encontrada" });
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la canción", details: err.message });
  }
};

/**
 * Controlador para crear una nueva canción.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const createSong = async (req, res) => {
  try {
    await createSongInDB(req.body);
    res.status(201).json({ message: "Canción creada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al crear la canción", details: err.message });
  }
};

/**
 * Controlador para actualizar una canción existente.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const updateSong = async (req, res) => {
  try {
    await updateSongInDB(req.params.id, req.body);
    res.json({ message: "Canción actualizada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la canción", details: err.message });
  }
};

/**
 * Controlador para eliminar una canción por su ID.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const deleteSong = async (req, res) => {
  try {
    await deleteSongInDB(req.params.id);
    res.json({ message: "Canción eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la canción", details: err.message });
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
};