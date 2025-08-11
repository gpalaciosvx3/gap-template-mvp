/**
 * Middleware de logging de request/response con tiempos. No registra cuerpos.
 */
import type { RequestHandler } from 'express';

import { logger } from '../../backend/common/logger/Logger';

/**
 * Crea el middleware de logging.
 * @returns RequestHandler para logging básico
 */
export function requestLogger(): RequestHandler {
  return (req, res, next) => {
    const start = Date.now();
    logger.info('REQUEST_START', { method: req.method, url: req.originalUrl });
    res.on('finish', () => {
      const durationMs = Date.now() - start;
      logger.info('REQUEST_END', {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        ms: durationMs,
      });
    });
    next();
  };
}


