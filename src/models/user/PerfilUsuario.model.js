import pool from '../../config/db.js';

const PerfilUsuarioModel = {

    getAll: async () => {
        const [rows] = await pool.query(`
            SELECT id, usuario_id, nombre, apellido, edad, telefono, created_at
            FROM tblPerfil_usuarios
        `);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query(`
            SELECT id, usuario_id, nombre, apellido, edad, telefono, created_at
            FROM tblPerfil_usuarios
            WHERE id = ?
        `, [id]);
        return rows[0];
    },

    getByUsuarioId: async (usuario_id) => {
        const [rows] = await pool.query(`
            SELECT id, usuario_id, nombre, apellido, edad, telefono, created_at
            FROM tblPerfil_usuarios
            WHERE usuario_id = ?
        `, [usuario_id]);
        return rows[0];
    },

    create: async (usuario_id, { nombre, apellido, edad, telefono }) => {
        const [result] = await pool.query(`
            INSERT INTO tblPerfil_usuarios (usuario_id, nombre, apellido, edad, telefono)
            VALUES (?, ?, ?, ?, ?)
        `, [usuario_id, nombre, apellido, edad, telefono]);
        return result.insertId;
    },

    update: async (usuario_id, { nombre, apellido, edad, telefono }) => {
        await pool.query(`
            UPDATE tblPerfil_usuarios
            SET nombre = ?, apellido = ?, edad = ?, telefono = ?
            WHERE usuario_id = ?
        `, [nombre, apellido, edad, telefono, usuario_id]);
    },

    delete: async (usuario_id) => {
        await pool.query(
            'DELETE FROM tblPerfil_usuarios WHERE usuario_id = ?',
            [usuario_id]
        );
    }
};

export default PerfilUsuarioModel;