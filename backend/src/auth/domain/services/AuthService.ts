/**
 * Servicio de dominio responsable de la autenticación de usuarios.
 * Orquesta repositorios del dominio y expone operaciones de autenticación.
 */
import { AuthError } from "../errors/AuthErrors";
import type { AuthRepository } from "../repositories/AuthRepository";
import type { PasswordHashRepository } from "../repositories/PasswordHashRepository";

export class AuthService {
  private readonly authRepository: AuthRepository;
  private readonly passwordHasher: PasswordHashRepository;

  /**
   * Crea una instancia del servicio de autenticación.
   * @param authRepository Repositorio de usuarios para búsquedas por email
   * @param passwordHasher Repositorio para comparar contraseñas en texto plano vs hash
   */
  constructor(
    authRepository: AuthRepository,
    passwordHasher: PasswordHashRepository,
  ) {
    this.authRepository = authRepository;
    this.passwordHasher = passwordHasher;
  }

  /**
   * Valida credenciales y retorna identificadores del usuario.
   * @param email Email del usuario a autenticar
   * @param password Contraseña en texto plano
   * @returns Objeto con userId y email cuando las credenciales son válidas
   * @throws AuthError si las credenciales no son válidas
   */
  async validateCredentials(
    email: string,
    password: string,
  ): Promise<{ userId: string; email: string }> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) throw AuthError.invalidCredentials();

    const isValid = await this.passwordHasher.compare(
      password,
      user.passwordHash,
    );
    if (!isValid) throw AuthError.invalidCredentials();

    return { userId: user.id, email: user.email };
  }
}
