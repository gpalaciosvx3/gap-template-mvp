/**
 * Contrato del repositorio de usuarios para autenticación.
 * Permite obtener un usuario por email sin exponer detalles de infraestructura.
 */
import type { User } from "../entities/User";

export interface AuthRepository {
  /**
   * Busca un usuario por su email.
   * @param email Email del usuario
   * @returns Usuario encontrado o null si no existe
   */
  findByEmail(email: string): Promise<User | null>;
}
