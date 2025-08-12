/**
 * Construcción del Gateway (Express): middlewares, validación y rutas.
 * Exporta una función para crear el `app` reutilizable en despliegues (e.g., Railway).
 */
import path from 'path';

import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';

import { logger } from '../backend/common/logger/Logger';

import { errorHandler } from './middlewares/error-handler';
import { requestLogger } from './middlewares/request-logger';
import { validateBody } from './middlewares/validate-body';
import { loadYamlRoutes } from './utils/route-loader';
import { loginBodySchema } from './validation/auth.schemas';

export function createGatewayApp(): Express {
  dotenv.config();

  const app: Express = express();

  app.use(cors());
  app.use(express.json());
  app.use(requestLogger());

  app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

  const routesYamlPath = path.resolve(process.cwd(), 'gateway', 'routes.yaml');
  loadYamlRoutes(app, routesYamlPath, {
    loginBody: validateBody(loginBodySchema),
  }).catch((err) => {
    logger.error('Error al cargar las rutas', {
      message: err?.message,
      stack: err?.stack,
    });
  });

  app.use(errorHandler());

  return app;
}

export default createGatewayApp;
