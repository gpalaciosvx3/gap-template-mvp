/**
 * Contenedor de dependencias del módulo Auth.
 * Ensambla implementaciones de infraestructura cumpliendo el Principio de Inversión de Dependencias.
 */
import { LoginUseCase } from '../../application/usecases/LoginUseCase';
import { AuthService } from '../../domain/services/AuthService';
import { BcryptPasswordHashRepository } from '../repositories/BcryptPasswordHashRepository';
import { InMemoryAuthRepository } from '../repositories/InMemoryAuthRepository';
import { JwtTokenRepository } from '../repositories/JwtTokenRepository';

const authRepository = new InMemoryAuthRepository();
const passwordHasher = new BcryptPasswordHashRepository();
const tokenProvider = new JwtTokenRepository();
const authService = new AuthService(authRepository, passwordHasher);

/**
 * Casos de uso expuestos por el módulo Auth.
 * - loginUseCase: ejecuta la autenticación y emite token.
 */
export const useCases = {
  loginUseCase: new LoginUseCase(authService, tokenProvider),
};
