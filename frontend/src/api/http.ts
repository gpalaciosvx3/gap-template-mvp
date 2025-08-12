/**
 * Cliente HTTP global para el Frontend.
 * Proporciona helpers tipados para llamadas GET, POST, PUT, PATCH y DELETE.
 */

import { API_GATEWAY_URL } from './config';
import { ApiError, mapGatewayError, networkError } from './errors';

/** Proveedor global de token (Authorization). */
let authTokenProvider: (() => string | null) | null = null;

/**
 * Registra un proveedor global de token. Si el proveedor devuelve un valor,
 */
export function setAuthTokenProvider(provider: () => string | null): void {
  authTokenProvider = provider;
}

/** Opciones comunes para peticiones JSON */
function buildJsonHeaders(extra?: HeadersInit): HeadersInit {
  const base: Record<string, string> = { 'Content-Type': 'application/json' };

  const token = authTokenProvider ? authTokenProvider() : null;
  if (token) {
    base['Authorization'] = `Bearer ${token}`;
  }

  return { ...base, ...(extra ?? {}) };
}

/**
 * Construye una URL concatenando la base del Gateway con el path indicado.
 */
function buildUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_GATEWAY_URL}${normalized}`;
}

/**
 * Intenta parsear JSON de forma segura, devolviendo `undefined` si falla.
 */
async function safeParseJson(response: Response): Promise<unknown | undefined> {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}

/**
 * Manejo estándar de respuestas: lanza ApiError si no es ok y parsea JSON.
 */
async function handleJsonResponse<T>(method: string, url: string, response: Response): Promise<T> {
  if (!response.ok) {
    const body = await safeParseJson(response);
    throw mapGatewayError({ status: response.status, method, url, body });
  }

  if (response.status === 204) return undefined as unknown as T;

  const body = await safeParseJson(response);
  return body as T;
}

async function doFetch<T>(method: string, path: string, init?: RequestInit): Promise<T> {
  const url = buildUrl(path);
  try {
    const response = await fetch(url, {
      ...(init ?? {}),
      method,
      headers: buildJsonHeaders(init?.headers),
    });
    return await handleJsonResponse<T>(method, url, response);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw networkError({ method, url, cause: err });
  }
}

/**
 * Realiza una petición HTTP GET y retorna JSON tipado.
 */
export function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  return doFetch<T>('GET', path, init);
}

/**
 * Realiza una petición HTTP POST con cuerpo JSON y retorna JSON tipado.
 */
export function apiPost<T, B = unknown>(path: string, body?: B, init?: RequestInit): Promise<T> {
  return doFetch<T>('POST', path, {
    ...(init ?? {}),
    body: body != null ? JSON.stringify(body) : undefined,
  });
}

/**
 * Realiza una petición HTTP PUT con cuerpo JSON y retorna JSON tipado.
 */
export function apiPut<T, B = unknown>(path: string, body?: B, init?: RequestInit): Promise<T> {
  return doFetch<T>('PUT', path, {
    ...(init ?? {}),
    body: body != null ? JSON.stringify(body) : undefined,
  });
}

/**
 * Realiza una petición HTTP PATCH con cuerpo JSON y retorna JSON tipado.
 */
export function apiPatch<T, B = unknown>(path: string, body?: B, init?: RequestInit): Promise<T> {
  return doFetch<T>('PATCH', path, {
    ...(init ?? {}),
    body: body != null ? JSON.stringify(body) : undefined,
  });
}

/**
 * Realiza una petición HTTP DELETE y retorna JSON tipado.
 */
export function apiDelete<T>(path: string, init?: RequestInit): Promise<T> {
  return doFetch<T>('DELETE', path, init);
}
