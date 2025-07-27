const fetch = require('node-fetch');

const SUPABASE_URL = process.env.SUPABASE_URL.trim();
const SUPABASE_KEY = process.env.SUPABASE_KEY.trim();

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

// Obtener todas las canciones
const getAllSongsFromDB = async () => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/tbl_song`, { headers });
  return await res.json();
};

// Obtener canción por ID
const getSongByIdFromDB = async (id) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/tbl_song?id_song=eq.${id}`, { headers });
  const data = await res.json();
  return data[0];
};

// Crear canción
const createSongInDB = async (song) => {
  await fetch(`${SUPABASE_URL}/rest/v1/tbl_song`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      song_name: song.SONG_NAME,
      song_path: song.SONG_PATH,
      plays: song.PLAYS || 0,
    }),
  });
};

// Actualizar canción
const updateSongInDB = async (id, song) => {
  await fetch(`${SUPABASE_URL}/rest/v1/tbl_song?id_song=eq.${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      song_name: song.SONG_NAME,
      song_path: song.SONG_PATH,
      plays: song.PLAYS || 0,
    }),
  });
};

// Eliminar canción
const deleteSongInDB = async (id) => {
  await fetch(`${SUPABASE_URL}/rest/v1/tbl_song?id_song=eq.${id}`, {
    method: 'DELETE',
    headers,
  });
};

module.exports = {
  getAllSongsFromDB,
  getSongByIdFromDB,
  createSongInDB,
  updateSongInDB,
  deleteSongInDB,
};