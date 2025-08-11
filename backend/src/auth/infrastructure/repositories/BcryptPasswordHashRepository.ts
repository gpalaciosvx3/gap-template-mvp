/**
 * Adaptador de infraestructura que implementa el repositorio de hashing de contraseñas
 * usando bcrypt. Cumple el contrato `PasswordHashRepository` del dominio.
 */
import bcrypt from "bcryptjs";

import type { PasswordHashRepository } from "../../domain/repositories/PasswordHashRepository";

/**
 * Repositorio de hashing basado en bcrypt.
 */
export class BcryptPasswordHashRepository implements PasswordHashRepository {
  /**
   * Compara una contraseña en texto plano con un hash usando bcrypt.
   * @param plain Contraseña en texto plano
   * @param hash Hash almacenado
   */
  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
