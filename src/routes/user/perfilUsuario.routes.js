// perfil_usuarios.routes.js
import { Router } from 'express';
import {
    getAllPerfiles,
    getPerfilById,
    getPerfilByUsuarioId,
    crearPerfil,
    actualizarPerfil,
    eliminarPerfil
} from '../../controllers/user/perfil_usuarios.controller.js';

const router = Router();

// Rutas para obtener perfiles
router.get('/:usuario_id', getPerfilByUsuarioId);
router.get('/:id', getPerfilById);
router.get('/', getAllPerfiles);

// Rutas para crear, actualizar y eliminar perfiles
router.post('/:usuario_id', crearPerfil);
router.put('/:usuario_id', actualizarPerfil);
router.delete('/:usuario_id', eliminarPerfil);

export default router;