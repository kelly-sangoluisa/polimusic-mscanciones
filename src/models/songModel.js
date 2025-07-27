/**
 * Modelo de acceso a datos para la entidad Canción (TBL_SONG).
 * 
 * Este módulo define funciones asíncronas para realizar operaciones CRUD
 * sobre la tabla TBL_SONG en SQL Server, utilizando consultas parametrizadas
 * para evitar vulnerabilidades de SQL Injection.
 * 
 * Todas las funciones utilizan el pool de conexiones exportado por config/database.js.
 */
const { poolPromise } = require("../config/database");

/**
 * Obtiene todas las canciones de la base de datos.
 * @returns {Promise<Array>} Lista de canciones.
 */
const getAllSongsFromDB = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM TBL_SONG");
  return result.recordset;
};

/**
 * Obtiene una canción por su ID.
 * @param {number} id - ID de la canción.
 * @returns {Promise<Object>} Canción encontrada o undefined.
 */
const getSongByIdFromDB = async (id) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("id", id)
    .query("SELECT * FROM TBL_SONG WHERE ID_SONG = @id");
  return result.recordset[0];
};

/**
 * Crea una nueva canción en la base de datos.
 * @param {Object} song - Objeto con los datos de la canción.
 * @returns {Promise<void>}
 */
const createSongInDB = async (song) => {
  const pool = await poolPromise;
  await pool.request()
    .input("SONG_NAME", song.SONG_NAME)
    .input("SONG_PATH", song.SONG_PATH)
    .input("PLAYS", song.PLAYS)
    .query("INSERT INTO TBL_SONG (SONG_NAME, SONG_PATH, PLAYS) VALUES (@SONG_NAME, @SONG_PATH, @PLAYS)");
};

/**
 * Actualiza una canción existente por su ID.
 * @param {number} id - ID de la canción a actualizar.
 * @param {Object} song - Objeto con los nuevos datos de la canción.
 * @returns {Promise<void>}
 */
const updateSongInDB = async (id, song) => {
  const pool = await poolPromise;
  await pool.request()
    .input("id", id)
    .input("SONG_NAME", song.SONG_NAME)
    .input("SONG_PATH", song.SONG_PATH)
    .input("PLAYS", song.PLAYS)
    .query("UPDATE TBL_SONG SET SONG_NAME = @SONG_NAME, SONG_PATH = @SONG_PATH, PLAYS = @PLAYS WHERE ID_SONG = @id");
};

/**
 * Elimina una canción por su ID.
 * @param {number} id - ID de la canción a eliminar.
 * @returns {Promise<void>}
 */
const deleteSongInDB = async (id) => {
  const pool = await poolPromise;
  await pool.request()
    .input("id", id)
    .query("DELETE FROM TBL_SONG WHERE ID_SONG = @id");
};

module.exports = {
  getAllSongsFromDB,
  getSongByIdFromDB,
  createSongInDB,
  updateSongInDB,
  deleteSongInDB,
};