/**
 * Implementación en memoria del repositorio de usuarios.
 * Útil para MVP y pruebas sin base de datos.
 */
import bcrypt from 'bcryptjs';

import type { User } from '../../domain/entities/User';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';

export class InMemoryAuthRepository implements AuthRepository {
  private readonly users: User[];

  constructor() {
    const defaultHash = bcrypt.hashSync('admin123', 10);
    this.users = [
      {
        id: '1',
        email: 'admin@example.com',
        passwordHash: defaultHash,
        name: 'Admin',
      },
    ];
  }

  /**
   * Busca un usuario por email en la colección en memoria.
   */
  async findByEmail(email: string): Promise<User | null> {
    const found = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return found ? { ...found } : null;
  }
}


