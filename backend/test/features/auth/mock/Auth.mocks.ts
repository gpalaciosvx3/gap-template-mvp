/**
 * Mocks de puertos del dominio para el caso de uso de Login.
 * Permite configurar comportamientos por escenario sin depender de infraestructura.
 */
import type { AuthRepository } from '../../../../src/auth/domain/repositories/AuthRepository';
import type { PasswordHashRepository } from '../../../../src/auth/domain/repositories/PasswordHashRepository';
import type { TokenRepository } from '../../../../src/auth/domain/repositories/TokenRepository';
import { AuthService } from '../../../../src/auth/domain/services/AuthService';

/**
 * Construye dependencias mockeadas y el servicio de autenticación.
 * @returns Repositorios mockeables y el servicio de dominio listo para inyectar
 */
export function buildLoginUseCaseWithMocks(): {
  authRepository: AuthRepository;
  passwordHasher: PasswordHashRepository;
  tokenProvider: TokenRepository;
  authService: AuthService;
} {
  const authRepository: AuthRepository = {
    async findByEmail() {
      throw new Error('Mock no configurado: findByEmail');
    },
  };

  const passwordHasher: PasswordHashRepository = {
    async compare() {
      throw new Error('Mock no configurado: compare');
    },
  };

  const tokenProvider: TokenRepository = {
    async sign() {
      throw new Error('Mock no configurado: sign');
    },
  };

  const authService = new AuthService(authRepository, passwordHasher);

  return { authRepository, passwordHasher, tokenProvider, authService };
}
