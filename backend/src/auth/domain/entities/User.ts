/**
 * Entidad de dominio para representar a un usuario autenticable.
 * Define los atributos mínimos requeridos por casos de uso de autenticación.
 */
export type User = {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
};
