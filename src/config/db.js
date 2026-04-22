import mysql from 'mysql2/promise';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, modoProduction } from '../config.js';
import { textoColorido } from '../utils/colorText.js';
import { LOG_MESSAGES } from '../constants/logMessages.js';
import { formatearFecha } from '../utils/formateo.js';
import 'dotenv/config';

const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
    timezone: '+00:00'
});

pool.getConnection()
    .then(conn => {
        textoColorido(
            LOG_MESSAGES.DB_CONECTADA(formatearFecha()),
            ["rgb(60, 255, 0)", "rgb(9, 108, 20)"],
            modoProduction
        );
        conn.release();
    })
    .catch(err => {
        let mensajeError = '';

        if (err.errors && err.errors[0]) {
            // Toma el primer error del array
            mensajeError = err.errors[0].message;
        } else {
            mensajeError = err.message || err.code || LOG_MESSAGES.DB_ERROR_DESCONOCIDO;
        }
        textoColorido(
            LOG_MESSAGES.DB_ERROR_CONEXION(mensajeError),
            ["rgb(255, 0, 0)", "rgb(255, 69, 0)"],
            modoProduction
        );
        process.exit(1);
    });

export default pool;