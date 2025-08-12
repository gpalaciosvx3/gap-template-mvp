/**
 * Errores y utilidades de mapeo para respuestas del Gateway.
 */

/** Estructura de error devuelta por el Gateway (ApiResponse.fail) */
export interface GatewayErrorBody {
  code: string;
  message: string;
  details?: unknown;
}

/** Error enriquecido que se lanza desde el cliente HTTP */
export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details?: unknown;
  readonly method: string;
  readonly url: string;
  readonly raw?: unknown;

  constructor(params: {
    status: number;
    code?: string;
    message: string;
    details?: unknown;
    method: string;
    url: string;
    raw?: unknown;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.status = params.status;
    this.code = params.code;
    this.details = params.details;
    this.method = params.method;
    this.url = params.url;
    this.raw = params.raw;
  }
}

/** Mensaje amigable según status cuando no hay message específico */
function defaultMessageForStatus(status: number): string {
  switch (status) {
    case 400:
      return "Solicitud inválida";
    case 401:
      return "No autorizado";
    case 403:
      return "Acceso prohibido";
    case 404:
      return "Recurso no encontrado";
    case 409:
      return "Conflicto de datos";
    case 422:
      return "Datos inválidos";
    case 429:
      return "Demasiadas solicitudes";
    case 500:
      return "Error interno del servidor";
    case 502:
      return "Puerta de enlace inválida";
    case 503:
      return "Servicio no disponible";
    case 504:
      return "Tiempo de espera agotado";
    default:
      return `Error HTTP ${status}`;
  }
}

/** Mapea un cuerpo de error de Gateway a ApiError */
export function mapGatewayError(params: {
  status: number;
  method: string;
  url: string;
  body: unknown;
}): ApiError {
  const { status, method, url, body } = params;
  const maybe = body as { success?: boolean; error?: GatewayErrorBody };
  const code = maybe?.error?.code;
  const message = maybe?.error?.message ?? defaultMessageForStatus(status);
  const details = maybe?.error?.details;

  return new ApiError({
    status,
    code,
    message,
    details,
    method,
    url,
    raw: body,
  });
}

/** Crea un ApiError para errores de red (sin respuesta HTTP) */
export function networkError(params: {
  method: string;
  url: string;
  cause?: unknown;
}): ApiError {
  const { method, url, cause } = params;
  return new ApiError({
    status: 0,
    code: "NETWORK_ERROR",
    message: "No se pudo conectar con el servidor",
    method,
    url,
    raw: cause,
  });
}
