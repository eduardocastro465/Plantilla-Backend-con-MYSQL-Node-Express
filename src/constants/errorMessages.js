
// Mis mensajes de error
//aqui van los mensajes de error que se usan en toda la aplicacion

export const ERROR_MESSAGES = {
    // Auth
    TOKEN_NO_PROPORCIONADO: 'Debes iniciar sesión para continuar',
    TOKEN_INVALIDO: 'Tu sesión no es válida, inicia sesión nuevamente',
    TOKEN_EXPIRADO: 'Tu sesión ha expirado, inicia sesión nuevamente',

    // Roles
    SIN_ROL: 'Tu cuenta no tiene un rol asignado, contacta al administrador',
    SIN_PERMISO: 'No tienes permiso para realizar esta acción',

    // Auth general
    CREDENCIALES_INCORRECTAS: 'Credenciales incorrectas',
    USUARIO_DESACTIVADO: 'Tu cuenta está desactivada, contacta al administrador',
    CONTRASENA_INCORRECTA: 'La contraseña actual es incorrecta',

    // Validación
    CAMPOS_REQUERIDOS: 'Todos los campos son obligatorios',
    FORMATO_EMAIL_INVALIDO: 'El formato del correo electrónico no es válido',
    CONTRASENA_MUY_CORTA: 'La contraseña debe tener al menos 8 caracteres',


    // Dinámicos
    YA_EXISTE: (campo) => `El ${campo} ya está en uso`,
    NO_EXISTE: (campo) => `El ${campo} no existe`,
    NO_ENCONTRADO: (campo) => `El ${campo} no fue encontrado`,
    NO_ACTUALIZADO: (campo) => `El ${campo} no fue actualizado`,
    NO_ELIMINADO: (campo) => `El ${campo} no fue eliminado`,

    // Base de datos
    ERROR_CONSULTA: 'Error al consultar la base de datos',
    ERROR_TRANSACCION: 'Error al procesar la transacción',

    // Servidor
    RUTA_NO_ENCONTRADA: 'Ruta no encontrada',
    ERROR_INTERNO: 'Ocurrió un error inesperado, intenta más tarde',
    SERVICIO_NO_DISPONIBLE: 'El servicio no está disponible, intenta más tarde',
};