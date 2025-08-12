/**
 * Configuración global del Frontend.
 * Expone constantes listas para importar en servicios HTTP.
 */

/**
 * Declaración local de la constante global inyectada por Vite.
 * Evita depender de archivos .d.ts en el frontend.
 */
declare const PROCESS: { ENV: { API_GATEWAY?: string } };

export const API_GATEWAY_URL: string = PROCESS.ENV.API_GATEWAY ?? 'http://localhost:3000';
