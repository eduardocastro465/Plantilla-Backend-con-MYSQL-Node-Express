export const ROLES = Object.freeze({
    Usuario: 1,
    Administrador: 2,
    Propietario: 3,
});

export const ROLES_TODOS = [ROLES.Usuario, ROLES.Administrador, ROLES.Propietario];
export const ROLES_ADMIN = [ROLES.Administrador, ROLES.Propietario];
