/**
 * Configuración y gestión de la conexión a la base de datos SQL Server.
 * 
 * Este módulo utiliza el paquete 'mssql' para establecer una conexión con SQL Server,
 * empleando parámetros definidos en variables de entorno. Exporta una promesa de pool
 * de conexiones reutilizable en toda la aplicación, permitiendo realizar consultas
 * de manera eficiente y segura.
 * 
 * Variables de entorno requeridas:
 *   - DB_USER: Usuario de la base de datos
 *   - DB_PASSWORD: Contraseña del usuario
 *   - DB_SERVER: Dirección o nombre del servidor SQL
 *   - DB_NAME: Nombre de la base de datos
 *   - DB_PORT: Puerto de conexión al servidor SQL
 */
const sql = require('mssql');
require('dotenv').config();

/**
 * Objeto de configuración para la conexión a SQL Server.
 * Los valores se obtienen de las variables de entorno para mayor seguridad y flexibilidad.
 */
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
/**
 * poolPromise
 * 
 * Promesa que resuelve un pool de conexiones a SQL Server.
 * Permite reutilizar la conexión en diferentes partes de la aplicación.
 * En caso de error, se muestra un mensaje descriptivo en consola.
 */
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a SQL Server');
        return pool;
    })
    .catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = { poolPromise };