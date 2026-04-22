import pool from '../../config/db.js';

const LogModel = {
    getAll: async (limit = 100, offset = 0) => {
        const [rows] = await pool.query(
            'SELECT * FROM tblLogs ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM tblLogs WHERE id = ?', [id]);
        return rows[0];
    },

    getByUserId: async (userId) => {
        const [rows] = await pool.query('SELECT * FROM tblLogs WHERE usuario_id = ?', [userId]);
        return rows;
    },

    getByDate: async (date) => {
        const [rows] = await pool.query('SELECT * FROM tblLogs WHERE DATE(created_at) = ?', [date]);
        return rows;
    },

    getByDateRange: async (startDate, endDate) => {
        const [rows] = await pool.query('SELECT * FROM tblLogs WHERE created_at BETWEEN ? AND ?', [startDate, `${endDate} 23:59:59`]);
        return rows;
    },

    getByNivel: async (nivel) => {
        const [rows] = await pool.query('SELECT * FROM tblLogs WHERE nivel = ?', [nivel]);
        return rows;
    },

    getByRuta: async (ruta) => {
        const [rows] = await pool.query('SELECT * FROM tblLogs WHERE ruta LIKE ?', [`%${ruta}%`]);
        return rows;
    },

    getByStatusCode: async (statusCode) => {
        const [rows] = await pool.query('SELECT * FROM tblLogs WHERE status_code = ?', [statusCode]);
        return rows;
    },

    getStats: async () => {
        const [rows] = await pool.query(`
            SELECT
                COUNT(*) as total,
                COUNT(CASE WHEN nivel = 'error' THEN 1 END) as errores,
                COUNT(CASE WHEN nivel = 'warn'  THEN 1 END) as advertencias,
                COUNT(CASE WHEN nivel = 'info'  THEN 1 END) as informativos,
                COUNT(CASE WHEN status_code >= 400 THEN 1 END) as fallidos
            FROM tblLogs
        `);
        return rows[0];
    },

    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM tblLogs WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },

    deleteByDateRange: async (startDate, endDate) => {
        const [result] = await pool.query('DELETE FROM tblLogs WHERE created_at BETWEEN ? AND ?', [startDate, `${endDate} 23:59:59`]);
        return result.affectedRows > 0;
    },

    deleteAll: async () => {
        await pool.query('DELETE FROM tblLogs');
    },

    deleteOldLogs: async (days = 90) => {
        await pool.query(
            'DELETE FROM tblLogs WHERE created_at < NOW() - INTERVAL ? DAY',
            [days]
        );
    },
};

export default LogModel;