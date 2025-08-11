/**
 * DTO homogéneo de respuesta HTTP usado por Presenters.
 */
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: Record<string, unknown>;
};
