/**
 * Middleware de logging de request/response con tiempos. No registra cuerpos.
 */
import type { RequestHandler } from "express";

import { logger } from "../../backend/common/logger/Logger";
import { getEndpointName } from "../utils/endpoint-name";

/**
 * Crea el middleware de logging.
 * @returns RequestHandler para logging básico
 */
export function requestLogger(): RequestHandler {
  return (req, res, next) => {
    const start = Date.now();
    const endpointName = getEndpointName(req.method, req.originalUrl, req.route?.path);
    logger.info(`────── INICIO - ${endpointName} ──────`);
    res.on("finish", () => {
      const durationMs = Date.now() - start;
      const success = res.statusCode < 400;
      const statusIcon = success ? "✅" : "❌";
      logger.info(`────── FINALIZÓ - ${endpointName} ${statusIcon} (${durationMs}ms) ──────`);
    });
    next();
  };
}
