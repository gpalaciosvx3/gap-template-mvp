/**
 * Utilidades de entorno para el Frontend.
 * Determina el `API_BASE_URL` para consumir el Gateway.
 */

/**
 * Obtiene la URL base del Gateway.
 * Prioriza `VITE_API_BASE_URL`; por defecto usa `http://localhost:3000`.
 */
export function getApiBaseUrl(): string {
  const fromEnv = import.meta.env?.VITE_API_BASE_URL;
  return fromEnv && fromEnv.length > 0 ? fromEnv : "http://localhost:3000";
}


