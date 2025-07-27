/*const { poolConnect, pool } = require('../config/database');

async function getAllSongs() {
  await poolConnect;
  const result = await pool.request().query('SELECT * FROM TBL_SONG');
  return result.recordset;
}

async function getSongById(id) {
  await poolConnect;
  const result = await pool.request()
    .input('id', id)
    .query('SELECT * FROM TBL_SONG WHERE id = @id');
  return result.recordset[0];
}

async function createSong(song) {
  await poolConnect;
  const result = await pool.request()
    .input('title', song.title)
    .input('artist', song.artist)
    .input('genre', song.genre)
    .query('INSERT INTO TBL_SONG (title, artist, genre) VALUES (@title, @artist, @genre)');
  return result;
}

module.exports = { getAllSongs, getSongById, createSong };
*/

/*funcionando
const { poolPromise } = require("../config/database");

const getAllSongsFromDB = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM TBL_SONG");
  return result.recordset;
};

module.exports = { getAllSongsFromDB };*/

const { poolPromise } = require("../config/database");

const getAllSongsFromDB = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM TBL_SONG");
  return result.recordset;
};

const getSongByIdFromDB = async (id) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("id", id)
    .query("SELECT * FROM TBL_SONG WHERE ID_SONG = @id");
  return result.recordset[0];
};

const createSongInDB = async (song) => {
  const pool = await poolPromise;
  await pool.request()
    .input("SONG_NAME", song.SONG_NAME)
    .input("SONG_PATH", song.SONG_PATH)
    .input("PLAYS", song.PLAYS)
    .query("INSERT INTO TBL_SONG (SONG_NAME, SONG_PATH, PLAYS) VALUES (@SONG_NAME, @SONG_PATH, @PLAYS)");
};

const updateSongInDB = async (id, song) => {
  const pool = await poolPromise;
  await pool.request()
    .input("id", id)
    .input("SONG_NAME", song.SONG_NAME)
    .input("SONG_PATH", song.SONG_PATH)
    .input("PLAYS", song.PLAYS)
    .query("UPDATE TBL_SONG SET SONG_NAME = @SONG_NAME, SONG_PATH = @SONG_PATH, PLAYS = @PLAYS WHERE ID_SONG = @id");
};

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