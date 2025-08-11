/**
 * Middleware global de manejo de errores. Formatea salida homogénea.
 */
import type { ErrorRequestHandler } from "express";

import { AppError } from "../../backend/common/errors/AppError";
import { logger } from "../../backend/common/logger/Logger";
import { ResponsePresenter } from "../../backend/common/presenters/ResponsePresenter";

/**
 * Crea el middleware de errores.
 * @returns ErrorRequestHandler que normaliza respuestas de error
 */
export function errorHandler(): ErrorRequestHandler {
  return (err, _req, res, _next) => {
    const isAppError = err instanceof AppError;
    const status = isAppError ? err.status : 500;
    const errorCode = isAppError ? err.code : "INTERNAL_ERROR";

    if (!isAppError) {
      logger.error("UNHANDLED_ERROR", {
        message: err?.message,
        stack: err?.stack,
      });
    }

    return ResponsePresenter.error(res, status, {
      code: errorCode,
      message: err.message ?? "Error interno",
    });
  };
}
