import pool from "../../config/db.js";
import { ERROR_MESSAGES } from '../../constants/errorMessages.js';

const Roles = {

    getAll: async () => {
        const [rows] = await pool.query(`select  id, rol, activo, created_at from tblRoles`);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.execute(`select id, rol, activo, created_at from tblRoles where id = ?`, [id]);
        return rows[0] || null;
    },

    create: async (rol, descripcion, activo) => {

        const [existe] = await pool.query('select id from tblRoles where rol = ?', [rol])

        if (existe.length > 0) {
            throw new Error(ERROR_MESSAGES.YA_EXISTE('rol'))
        }

        const [result] = await pool.execute(`insert into tblRoles (rol, descripcion, activo)
            values (?, ?, ?)`,
            [rol, descripcion, activo]
        );

        return result.affectedRows;
    },

    update: async (id, rol, descripcion, activo) => {

        const [result] = await pool.execute(`
            UPDATE tblRoles
            SET rol = ?,
                descripcion = ?,
                activo = ?
            WHERE id = ?
        `, [rol, descripcion, activo, id]);

        if (result.affectedRows === 0) {
            throw new Error(ERROR_MESSAGES.NO_EXISTE('rol'))
        }
        return { id, rol, descripcion, activo };
    },

    toggleActivo: async (id, activo) => {
        const [result] = await pool.execute(`update tblRoles set activo = ? where id = ?`, [activo, id]);
        return result.affectedRows > 0;
    },

    delete: async (id) => {
        const [result] = await pool.execute(`delete from tblRoles where id = ?`, [id]);
        return result.affectedRows > 0;
    },
}

export default Roles;