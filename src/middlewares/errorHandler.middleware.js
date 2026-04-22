// middlewares/errorHandler.middleware.js
import { modoProduction } from "../config.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";
import { logError } from '../utils/logger.js';

export const errorHandler = (error, req, res, next) => {

    const status = error.status ||
        (error.name === 'JsonWebTokenError' ? 401 :
            (error.message === ERROR_MESSAGES.CRED_INCORRECTAS ? 401 :
                (error.message?.includes(ERROR_MESSAGES.USUARIO_INACTIVO) ? 401 : 500)));

    if (!modoProduction) {
        console.error({
            status: 'Error',
            mensaje: error.message,
            ruta: req.originalUrl,
            metodo: req.method,
            stack: error.stack
        });
    }

    // Guardar en log (pasa el error y el req)
    logError(error, req);

    res.status(status).json({
        success: false,
        message: error.message || ERROR_MESSAGES.ERROR_INTERNO
    });
};

export const jsonErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        const error = new Error(`JSON inválido: ${err.message}`);
        error.status = 400;
        return next(error);
    }
    next(err);
};