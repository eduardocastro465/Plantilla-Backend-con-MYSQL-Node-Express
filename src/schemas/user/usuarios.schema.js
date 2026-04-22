import z from 'zod';


export const updateUsuarioSchema = z.object({
    usuario: z.string({ required_error: 'El usuario es obligatorio' })
        .min(3, 'El usuario debe tener al menos 3 caracteres')
        .max(50, 'El usuario no puede exceder 50 caracteres'),

    email: z.email({ required_error: 'El email es obligatorio' })
        .min(5, 'El email debe tener al menos 5 caracteres')
        .max(100, 'El email no puede exceder 100 caracteres')
}).strict();
