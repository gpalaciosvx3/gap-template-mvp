/**
 * Adaptador de infraestructura para comparar contraseñas con bcrypt.
 */
import bcrypt from 'bcryptjs';

import type { PasswordHashRepository } from '../../domain/repositories/PasswordHashRepository';


export class BcryptPasswordHasher implements PasswordHashRepository {
  /**
   * Compara una contraseña en texto plano con un hash usando bcrypt.
   */
  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}


