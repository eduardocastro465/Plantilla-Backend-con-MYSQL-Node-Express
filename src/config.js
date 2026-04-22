//Configuración del servidor
export const CORS_ORIGINS = process.env.CORS_ORIGINS || "http://localhost:3000";
export const PORT = process.env.PORT || 3000;

//Configuración del modo de producción
export const modoProduction = process.env.NODE_ENV === "production";

//Configuración de la base de datos
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "administrador_Tareas";

//Credenciales
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "token_adminis_tareas_1234";
export const JWT_SECRET = process.env.JWT_SECRET || "adminis_tareas_1234";