import { z } from "zod";

export const createRolSchema = z.object({
    rol: z.string({ required_error: 'El rol es obligatorio' })
        .min(3, 'El rol debe tener al menos 3 caracteres')
        .max(30, 'El rol no puede exceder 30 caracteres'),
    descripcion: z.string()
        .max(250, 'La descripción no puede exceder 250 caracteres')
        .optional(),
    activo: z.boolean({
        invalid_type_error: 'El campo activo debe ser verdadero o falso'
    }).default(true),
}).strict()

export const rolUpdateSchema = z.object({
    rol: z.string({ required_error: 'El rol es obligatorio' })
        .min(3, 'El rol debe tener al menos 3 caracteres')
        .max(30, 'El rol no puede exceder 30 caracteres'),
    descripcion: z.string()
        .max(250, 'La descripción no puede exceder 250 caracteres')
        .optional(),
    activo: z.boolean({
        invalid_type_error: 'El campo activo debe ser verdadero o falso'
    }).optional(),
}).strict()

export const rolToggleActivoSchema = z.object({
    activo: z.boolean({
        required_error: 'El campo activo es obligatorio',
        invalid_type_error: 'El campo activo debe ser verdadero o falso'
    }),
}).strict()
