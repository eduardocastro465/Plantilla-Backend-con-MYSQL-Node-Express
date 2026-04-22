import pool from '../../config/db.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../../libs/jwt.js";
import { ERROR_MESSAGES } from '../../constants/errorMessages.js';

const AuthModel = {

    comprobarPermisos: async (rol_id) => {
        const [rows] = await pool.query(
            `SELECT
                r.id,
                r.rol,
                r.activo
            FROM tblRoles r
            WHERE r.id = ?`,
            [rol_id]
        );

        if (rows.length === 0) throw new Error(ERROR_MESSAGES.NO_ENCONTRADO('rol'));
        if (!rows[0].activo) throw new Error(ERROR_MESSAGES.USUARIO_DESACTIVADO);

        return rows[0];
    },

    emailExists: async (email) => {
        const [rows] = await pool.query(
            'SELECT id FROM tblUsuarios WHERE email = ?',
            [email]
        );
        return rows.length > 0;
    },

    login: async (email, nombreUsuario, password) => {
        const [rows] = await pool.query(
            `SELECT
                u.id,
                u.usuario,
                u.email,
                u.password,
                u.activo,
                u.rol_id,
                r.rol
            FROM tblUsuarios u
            LEFT JOIN tblRoles r ON u.rol_id = r.id
            WHERE u.email = ? OR u.usuario = ?`,
            [email, nombreUsuario]
        );

        if (rows.length === 0) throw new Error(ERROR_MESSAGES.CREDENCIALES_INCORRECTAS);

        const usuario = rows[0];

        if (!usuario.activo) throw new Error(ERROR_MESSAGES.USUARIO_DESACTIVADO);

        const isValid = await bcrypt.compare(password, usuario.password);

        if (!isValid) throw new Error(ERROR_MESSAGES.CREDENCIALES_INCORRECTAS);

        const payload = {
            id: usuario.id,
            usuario: usuario.usuario,
            email: usuario.email,
            rol_id: usuario.rol_id,
            activo: usuario.activo
        };

        const token = createAccessToken(payload);

        return token;
    },

    register: async (usuario, perfilUsuario) => {

        const rol_id = 1; // usuario basico

        const rondas = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(usuario.password, rondas)

        const conexion = await pool.getConnection()

        try {
            await conexion.beginTransaction();

            const [resultUsuario] = await conexion.query(
                `INSERT INTO tblUsuarios (usuario, email, password, rol_id) VALUES (?, ?, ?, ?)`,
                [usuario.usuario, usuario.email, contrasenaEncriptada, rol_id]
            );

            const usuario_id = resultUsuario.insertId

            await conexion.query(`insert into tblPerfil_usuarios(
            nombre, apellido, edad, telefono, usuario_id)
            values
            (?, ?, ?, ?, ?)
            `, [perfilUsuario.nombre, perfilUsuario.apellido, perfilUsuario.edad, perfilUsuario.telefono, usuario_id]);


            const payload = {
                id: usuario.id,
                usuario: usuario.usuario,
                email: usuario.email,
                rol_id: usuario.rol_id,
                activo: usuario.activo
            };

            const token = createAccessToken(payload);

            await conexion.commit();

            return token;
        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
    },

    changePassword: async (email, usuario, password, newPassword) => {
        const conexion = await pool.getConnection();

        try {
            await conexion.beginTransaction();

            const [rows] = await conexion.query(
                'SELECT id, password FROM tblUsuarios WHERE email = ? OR usuario = ?',
                [email, usuario]
            );

            const id_usuario = rows[0].id;

            if (rows.length === 0) throw new Error(ERROR_MESSAGES.NO_ENCONTRADO('correo o usuario'));

            const esCorrecta = await bcrypt.compare(password, rows[0].password)
            if (!esCorrecta) throw new Error(ERROR_MESSAGES.CREDENCIALES_INCORRECTAS);

            const salt = await bcrypt.genSalt(10);
            const newHashedPassword = await bcrypt.hash(newPassword, salt);

            await conexion.query(
                'UPDATE tblUsuarios SET password = ? WHERE id = ?',
                [newHashedPassword, id_usuario]
            );

            await conexion.commit();
            return true;
        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            conexion.release();
        }
    },

};

export default AuthModel;