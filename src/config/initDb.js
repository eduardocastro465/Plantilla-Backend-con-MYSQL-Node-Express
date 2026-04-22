import mysql from 'mysql2/promise';
import 'dotenv/config';
import { modoProduction, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '../config.js';
import { textoColorido } from '../utils/colorText.js';
import { LOG_MESSAGES } from '../constants/logMessages.js';
import { initTables } from './tables/index.js';

async function initDb() {

  try {
    const conn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      database: DB_NAME,
      password: DB_PASSWORD,
      multipleStatements: true
    });

    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await conn.query(`USE \`${DB_NAME}\``);

    // Inicializa las tablas
    await initTables(conn);

    textoColorido(
      LOG_MESSAGES.TABLAS_LISTAS,
      ["rgb(156, 60, 255)", "rgba(89, 0, 109, 1)"],
      modoProduction
    );

    await conn.end(); // cierra la conexión
  } catch (error) {

    textoColorido(
      LOG_MESSAGES.DB_ERROR_INIT(error.message),
      ["rgb(255, 230, 0)", "rgb(180, 100, 0)"],
      modoProduction
    );
  }
}

export default initDb;