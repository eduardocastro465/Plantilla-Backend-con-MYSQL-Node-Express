import { z } from 'zod';

// Esquema para registro de usuario
export const registerSchema = z.object({
    usuario: z.object({
        usuario: z.string({ required_error: 'El nombre de usuario es obligatorio' })
            .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
            .max(30, 'El nombre de usuario no puede exceder 30 caracteres'),

        email: z.email({ required_error: 'El email es obligatorio' })
            .min(5, 'El email debe tener al menos 5 caracteres')
            .max(100, 'El email no puede exceder 100 caracteres'),

        password: z.string({ required_error: 'La contraseña es obligatoria' })
            .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
            .max(50, 'La nueva contraseña no puede exceder 50 caracteres')
            .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
            .regex(/[a-z]/, 'Debe contener al menos una minúscula')
            .regex(/[0-9]/, 'Debe contener al menos un número')
            .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un símbolo')
    }),

    perfilUsuario: z.object({
        nombre: z.string({ required_error: 'El nombre es obligatorio' })
            .min(3, 'El nombre debe tener al menos 3 caracteres')
            .max(30, 'El nombre no puede exceder 30 caracteres'),

        apellido: z.string({ required_error: 'El apellido es obligatorio' })
            .min(3, 'El apellido debe tener al menos 3 caracteres')
            .max(50, 'El apellido no puede exceder 50 caracteres'),

        telefono: z.string({ required_error: 'El teléfono es obligatorio' })
            .regex(/^[0-9]{8,15}$/, 'Teléfono debe tener entre 8 y 15 dígitos'),

        edad: z.number({ required_error: 'La edad es obligatoria' })
            .int('La edad debe ser un número entero')
            .positive('La edad debe ser un número positivo')
            .optional(),
    }).optional()
}).strict();

// Esquema para login (email o usuario + password)
export const loginSchema = z.object({
    email: z.email({ required_error: 'El email es obligatorio' })
        .min(5, 'El email debe tener al menos 5 caracteres')
        .max(100, 'El email no puede exceder 100 caracteres')
        .optional(),

    usuario: z.string()
        .min(3, 'El usuario debe tener al menos 3 caracteres')
        .max(30, 'El usuario no puede exceder 30 caracteres')
        .optional(),

    password: z.string({ required_error: 'La contraseña es obligatoria' })
        .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
        .max(50, 'La nueva contraseña no puede exceder 50 caracteres')
        .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
        .regex(/[a-z]/, 'Debe contener al menos una minúscula')
        .regex(/[0-9]/, 'Debe contener al menos un número')
        .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un símbolo'),
}).refine(data => data.email || data.usuario, {
    message: 'Debe proporcionar email o usuario',
    path: ['email']
});

// Esquema para cambiar contraseña
export const cambiarContrasenaSchema = z.object({
    email: z.email({ required_error: 'El email es obligatorio' })
        .min(5, 'El email debe tener al menos 5 caracteres')
        .max(100, 'El email no puede exceder 100 caracteres')
        .optional(),

    usuario: z.string()
        .min(3, 'El usuario debe tener al menos 3 caracteres')
        .max(30, 'El usuario no puede exceder 30 caracteres')
        .optional(),

    password: z.string({ required_error: 'La contraseña actual es obligatoria' })
        .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
        .max(50, 'La nueva contraseña no puede exceder 50 caracteres')
    // .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    // .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    // .regex(/[0-9]/, 'Debe contener al menos un número')
    // .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un símbolo')
    ,

    newPassword: z.string({ required_error: 'La nueva contraseña es obligatoria' })
        .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
        .max(50, 'La nueva contraseña no puede exceder 50 caracteres')
        .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
        .regex(/[a-z]/, 'Debe contener al menos una minúscula')
        .regex(/[0-9]/, 'Debe contener al menos un número')
        .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un símbolo')
}).refine(data => data.email || data.usuario, {
    message: 'Debe proporcionar email o usuario',
    path: ['email']
}).refine(data => data.password !== data.newPassword, {
    message: 'La nueva contraseña debe ser diferente a la actual',
    path: ['newPassword']
});
