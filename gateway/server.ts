/**
 * Servidor Gateway (Express) para enrutar requests hacia los módulos del backend.
 * - Carga rutas desde routes.yaml y valida con Joi.
 * - Aplica logging estandarizado y manejo global de errores.
 */
import path from 'path';

import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';

import { logger } from '../backend/common/logger/Logger';

import { errorHandler } from './middlewares/error-handler';
import { requestLogger } from './middlewares/request-logger';
import { loginBodySchema } from './middlewares/schemas';
import { validateBody } from './middlewares/validate-body';
import { loadYamlRoutes } from './utils/route-loader';

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
  logger.error('Error al cargar las rutas', { message: err?.message, stack: err?.stack });
});

app.use(errorHandler());

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT);

export default app;


