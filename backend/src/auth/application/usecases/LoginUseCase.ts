/**
 * Caso de uso de Login: delega validación al servicio de dominio y emite token.
 */
import type { TokenRepository } from '../../domain/repositories/TokenRepository';
import { AuthService } from '../../domain/services/AuthService';
import type { LoginInput, LoginOutput } from '../dto/LoginDto';

export class LoginUseCase {
  private readonly authService: AuthService;
  private readonly tokenProvider: TokenRepository;

  /**
   * @param authRepository Repositorio de usuarios
   * @param passwordHasher Servicio para comparar contraseñas
   * @param tokenProvider Servicio para firmar tokens
   */
  constructor(authService: AuthService, tokenProvider: TokenRepository) {
    this.authService = authService;
    this.tokenProvider = tokenProvider;
  }

  /**
   * Ejecuta el login.
   * @param input Credenciales de login
   * @returns Token de acceso
   */
  async execute(input: LoginInput): Promise<LoginOutput> {
    const { userId, email } = await this.authService.validateCredentials(
      input.email,
      input.password,
    );

    const token = await this.tokenProvider.sign(
      { sub: userId, email },
      60 * 60,
    );
    return { token };
  }
}


