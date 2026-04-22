import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';
import { autorizar } from '../../middlewares/auth.middleware.js';
import { ROLES_TODOS } from '../../constants/roles.js';
import { loginSchema, registerSchema, cambiarContrasenaSchema } from '../../schemas/auth/auth.schema.js';
import { login, register, logout, cambiarContrasena } from '../../controllers/auth/auth.controller.js';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);
router.put('/cambiar-contrasena', verifyToken, autorizar(ROLES_TODOS), validate(cambiarContrasenaSchema), cambiarContrasena);
router.post('/logout', verifyToken, autorizar(ROLES_TODOS), logout);

export default router;