/**
 * Configuración global del Frontend.
 * Expone constantes listas para importar en servicios HTTP.
 */

/**
 * Declaración local de la constante global inyectada por Vite.
 * Evita depender de archivos .d.ts en el frontend.
 */
declare const PROCESS: { ENV: { API_GATEWAY?: string } };

/**
 * URL base del API Gateway. Toma su valor del .env de la raíz (API_GATEWAY).
 * Si no está definida, usa "http://localhost:3000" como valor por defecto.
 *
 * @constant
 * @type {string}
 */
export const API_GATEWAY_URL: string =
  PROCESS.ENV.API_GATEWAY ?? "http://localhost:3000";
