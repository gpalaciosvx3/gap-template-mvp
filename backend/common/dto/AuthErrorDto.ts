/**
 * DTO de errores del módulo Auth: códigos y mensajes estándar.
 */
export const AuthErrorCodes = {
  INVALID_CREDENTIALS: 'AUTH.INVALID_CREDENTIALS',
} as const;

export type AuthErrorCode = (typeof AuthErrorCodes)[keyof typeof AuthErrorCodes];

export const AuthErrorMessages: Record<AuthErrorCode, string> = {
  [AuthErrorCodes.INVALID_CREDENTIALS]: 'Credenciales inválidas',
};
