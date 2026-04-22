export const asyncHandler = (funcion) => (req, res, next) => {
  Promise.resolve(funcion(req, res, next)).catch(next); // catch(next) es para que el error se maneje en el middleware de errores
}

// throwError - Función para lanzar errores personalizados
export const throwError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};
