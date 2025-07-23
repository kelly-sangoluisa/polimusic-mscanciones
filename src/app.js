const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const songRoutes = require('./routes/songRoutes');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/songs', songRoutes);

// Ruta de prueba
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Microservicio funcionando correctamente' });
});

module.exports = app;