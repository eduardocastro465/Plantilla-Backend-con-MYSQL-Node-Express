import { createLogsTable } from "./log.tables.js";
import { createRolesTable } from "./roles.table.js";
import { createUsuariosTable, createPerfilUsuarioTable } from "./usuarios.table.js";
import { createTareasTable, createTareaComentariosTable } from "./tareas.table.js";
import { createAdjuntosTable } from "./adjuntos.tables.js";

// Inicializa todas las tablas
export const initTables = async (conn) => {
  await createLogsTable(conn);
  await createRolesTable(conn);
  await createUsuariosTable(conn);
  await createPerfilUsuarioTable(conn);
  await createTareasTable(conn);
  await createTareaComentariosTable(conn);
  await createAdjuntosTable(conn);
};