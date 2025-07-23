const Song = require('../models/songModel');

class SongController {
    static async getAllSongs(req, res) {
        try {
            const songs = await Song.getAll();
            res.json({
                success: true,
                data: songs,
                message: 'Canciones obtenidas exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getSongById(req, res) {
        try {
            const { id } = req.params;
            const song = await Song.getById(id);
            
            if (!song) {
                return res.status(404).json({
                    success: false,
                    message: 'Canción no encontrada'
                });
            }

            res.json({
                success: true,
                data: song,
                message: 'Canción obtenida exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async createSong(req, res) {
        try {
            const { name, path, plays } = req.body;

            if (!name || !path) {
                return res.status(400).json({
                    success: false,
                    message: 'Los campos name y path son requeridos'
                });
            }

            const newSong = await Song.create({ name, path, plays });
            res.status(201).json({
                success: true,
                data: newSong,
                message: 'Canción creada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async updateSong(req, res) {
        try {
            const { id } = req.params;
            const { name, path, plays } = req.body;

            if (!name || !path || plays === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Los campos name, path y plays son requeridos'
                });
            }

            const updatedSong = await Song.update(id, { name, path, plays });
            
            if (!updatedSong) {
                return res.status(404).json({
                    success: false,
                    message: 'Canción no encontrada'
                });
            }

            res.json({
                success: true,
                data: updatedSong,
                message: 'Canción actualizada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async deleteSong(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Song.delete(id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Canción no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Canción eliminada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = SongController;