/**
 * Cargador de rutas desde YAML que conecta rutas HTTP del gateway con módulos App.tsx.
 * El YAML define: method, path, module, export y opcionalmente validate.body (clave de validador).
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

import type { Express, RequestHandler } from 'express';
import { load as loadYaml } from 'js-yaml';

type RouteConfig = {
  method: string;
  path: string;
  module: string;
  export: string;
  validate?: {
    body?: string;
  };
};

type YamlSpec = {
  routes: RouteConfig[];
};

/**
 * Registra rutas en el `app` a partir del archivo YAML y añade validadores cuando correspondan.
 * @param app Instancia de Express
 * @param yamlFilePath Ruta absoluta del YAML de rutas
 * @param validators Mapa de validadores disponibles
 */
export async function loadYamlRoutes(
  app: Express,
  yamlFilePath: string,
  validators: Record<string, RequestHandler>,
): Promise<void> {
  const content = fs.readFileSync(yamlFilePath, 'utf8');
  const spec = loadYaml(content) as YamlSpec;
  if (!spec || !Array.isArray(spec.routes)) return;

  const registerByMethod: Record<
    'get' | 'post' | 'put' | 'patch' | 'delete',
    (path: string, ...handlers: RequestHandler[]) => void
  > = {
    get: app.get.bind(app),
    post: app.post.bind(app),
    put: app.put.bind(app),
    patch: app.patch.bind(app),
    delete: app.delete.bind(app),
  };

  for (const route of spec.routes) {
    const methodLc = route.method.toLowerCase();
    if (!['get', 'post', 'put', 'patch', 'delete'].includes(methodLc)) {
      throw new Error(`Método HTTP no soportado: ${route.method}`);
    }

    const fullModulePath = path.resolve(process.cwd(), route.module);
    const fileUrl = pathToFileURL(fullModulePath).href;
    const imported = (await import(fileUrl)) as Record<string, unknown>;
    const routeHandler = imported[route.export] as RequestHandler;
    if (typeof routeHandler !== 'function') {
      throw new Error(`Handler '${route.export}' no encontrado en ${route.module}`);
    }

    const middlewares: RequestHandler[] = [];
    if (route.validate?.body) {
      const validator = validators[route.validate.body];
      if (!validator) {
        throw new Error(
          `Validador '${route.validate.body}' no configurado para ${route.method} ${route.path}`,
        );
      }
      middlewares.push(validator);
    }

    const register = registerByMethod[methodLc as keyof typeof registerByMethod];
    register(route.path, ...middlewares, wrap(routeHandler));
  }
}

/**
 * Envoltura para propagar errores a middleware global.
 * @param handler RequestHandler original
 * @returns RequestHandler con captura de errores
 */
function wrap(handler: RequestHandler): RequestHandler {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}


