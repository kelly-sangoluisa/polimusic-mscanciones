const sql = require('mssql');

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

let pool = null;

const getConnection = async () => {
    try {
        if (!pool) {
            pool = await sql.connect(config);
        }
        return pool;
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
        throw error;
    }
};

module.exports = { getConnection, sql };