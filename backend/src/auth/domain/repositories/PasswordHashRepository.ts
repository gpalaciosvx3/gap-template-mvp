/**
 * Contrato del Repositorio de hashing de contraseñas (puerto de dominio).
 * Define las operaciones requeridas para comparar contraseñas.
 */
export interface PasswordHashRepository {
  /**
   * Compara una contraseña en texto plano con un hash almacenado.
   * @param plain Contraseña en texto plano
   * @param hash Hash almacenado
   * @returns true si coinciden, false en caso contrario
   */
  compare(plain: string, hash: string): Promise<boolean>;
}
