export const createLogsTable = async (conn) => {
    await conn.query(`CREATE TABLE IF NOT EXISTS tblLogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nivel ENUM('error', 'warn', 'info', 'http', 'sql') DEFAULT 'error',
        mensaje VARCHAR(500) NOT NULL,
        ruta VARCHAR(255) NULL,
        metodo ENUM('GET', 'POST', 'PUT', 'PATCH', 'DELETE') NULL,
        status_code INT NULL,
        usuario_id INT NULL,
        ip VARCHAR(45) NULL,
        user_agent TEXT NULL,
        body JSON NULL,
        query JSON NULL,
        params JSON NULL,
        stack TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        -- Índices para búsquedas rápidas
        INDEX idx_nivel (nivel),
        INDEX idx_ruta (ruta),
        INDEX idx_metodo (metodo),
        INDEX idx_created_at (created_at),
        INDEX idx_usuario_id (usuario_id),
        INDEX idx_status_code (status_code)
    )`);
};