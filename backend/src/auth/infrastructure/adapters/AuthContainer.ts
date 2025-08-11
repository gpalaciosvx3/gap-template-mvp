/**
 * Contenedor de dependencias del módulo Auth.
 * Ensambla implementaciones de infraestructura cumpliendo DIP.
 */
import { LoginUseCase } from '../../application/usecases/LoginUseCase';
import { AuthService } from '../../domain/services/AuthService';
import { InMemoryAuthRepository } from '../repositories/InMemoryAuthRepository';
import { BcryptPasswordHasher } from '../services/BcryptPasswordHasher';
import { JwtTokenProvider } from '../services/JwtTokenProvider';

const authRepository = new InMemoryAuthRepository();
const passwordHasher = new BcryptPasswordHasher();
const tokenProvider = new JwtTokenProvider();
const authService = new AuthService(authRepository, passwordHasher);

export const useCases = {
  loginUseCase: new LoginUseCase(authService, tokenProvider),
};