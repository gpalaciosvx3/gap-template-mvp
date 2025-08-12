/**
 * Helper para transformar errores de la capa de aplicación a un objeto plano comparable en fixtures.
 */
import { AppError } from '../../../../common/errors/AppError';

/**
 * Transforma un error de la capa de aplicación a un objeto plano comparable en fixtures.
 * @param error Error a transformar
 * @returns Objeto serializable con code, status y message
 */
export function toPlainError(error: unknown): {
  code: string;
  status: number;
  message: string;
} {
  if (error instanceof AppError) {
    return { code: error.code, status: error.status, message: error.message };
  }
  if (error instanceof Error) {
    return { code: 'UNKNOWN', status: 500, message: error.message };
  }
  return { code: 'UNKNOWN', status: 500, message: String(error) };
}
