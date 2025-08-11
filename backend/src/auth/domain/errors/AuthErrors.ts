/**
 * Errores del dominio de Auth: códigos y fábrica tipada.
 */
import { AuthErrorCodes, AuthErrorMessages } from '../../../../common/dto/AuthErrorDto';
import { AppError } from '../../../../common/errors/AppError';

export class AuthError extends AppError {
  /**
   * Error para credenciales inválidas
   * @returns Error de autenticación
   */
  static invalidCredentials(): AuthError {
    const code = AuthErrorCodes.INVALID_CREDENTIALS;
    return new AuthError(code, 401, AuthErrorMessages[code]);
  }
}


