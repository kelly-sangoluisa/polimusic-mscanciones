const { getConnection, sql } = require('../config/database');

class Song {
    static async getAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .query('SELECT ID_SONG as id, SONG_NAME as name, SONG_PATH as path, PLAYS as plays FROM TBL_SONG');
            return result.recordset;
        } catch (error) {
            throw new Error('Error al obtener las canciones: ' + error.message);
        }
    }

    static async getById(id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT ID_SONG as id, SONG_NAME as name, SONG_PATH as path, PLAYS as plays FROM TBL_SONG WHERE ID_SONG = @id');
            return result.recordset[0];
        } catch (error) {
            throw new Error('Error al obtener la canción: ' + error.message);
        }
    }

    static async create(songData) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('name', sql.VarChar(50), songData.name)
                .input('path', sql.VarChar(255), songData.path)
                .input('plays', sql.Int, songData.plays || 0)
                .query(`
                    INSERT INTO TBL_SONG (SONG_NAME, SONG_PATH, PLAYS) 
                    OUTPUT INSERTED.ID_SONG as id, INSERTED.SONG_NAME as name, 
                           INSERTED.SONG_PATH as path, INSERTED.PLAYS as plays
                    VALUES (@name, @path, @plays)
                `);
            return result.recordset[0];
        } catch (error) {
            throw new Error('Error al crear la canción: ' + error.message);
        }
    }

    static async update(id, songData) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('name', sql.VarChar(50), songData.name)
                .input('path', sql.VarChar(255), songData.path)
                .input('plays', sql.Int, songData.plays)
                .query(`
                    UPDATE TBL_SONG 
                    SET SONG_NAME = @name, SONG_PATH = @path, PLAYS = @plays
                    OUTPUT INSERTED.ID_SONG as id, INSERTED.SONG_NAME as name, 
                           INSERTED.SONG_PATH as path, INSERTED.PLAYS as plays
                    WHERE ID_SONG = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw new Error('Error al actualizar la canción: ' + error.message);
        }
    }

    static async delete(id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM TBL_SONG WHERE ID_SONG = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw new Error('Error al eliminar la canción: ' + error.message);
        }
    }
}

module.exports = Song;