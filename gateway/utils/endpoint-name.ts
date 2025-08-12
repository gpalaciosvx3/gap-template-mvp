/**
 * Utilidad para mapear y normalizar nombres legibles de endpoints para logging.
 * No depende de infraestructura del backend; se usa solo en el gateway.
 */

/**
 * Mapa de endpoints a nombres amigables.
 * La clave debe tener el formato: `${METHOD} ${pathPattern}`.
 */
export const endpointMap: Record<string, string> = {
  'GET /health': 'Health Check',
  'POST /api/auth/login': 'Login de Usuario',
};

/**
 * Normaliza una ruta concreta a un patrón: reemplaza segmentos dinámicos por `:id`.
 */
export function normalizePathToPattern(path: string): string {
  if (!path || path === '/') return '/';
  const parts = path.split('/').filter(Boolean);
  const normalized = parts.map((seg) => (/^(\d+|[0-9a-fA-F-]{8,})$/.test(seg) ? ':id' : seg));
  return `/${normalized.join('/')}`;
}

/**
 * Obtiene el nombre amigable del endpoint a partir del método y la ruta.
 * Da preferencia al `routePath` (patrón de Express) cuando está disponible.
 */
export function getEndpointName(method: string, path: string, routePath?: string): string {
  const methodUp = method.toUpperCase();
  const key = `${methodUp} ${routePath ?? normalizePathToPattern(path)}`;
  return endpointMap[key] ?? key;
}
