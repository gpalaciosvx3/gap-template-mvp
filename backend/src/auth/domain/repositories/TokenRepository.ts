/**
 * Contrato del Repositorio de emisión de tokens (puerto de dominio).
 * Define la operación para firmar tokens con expiración.
 */
export interface TokenRepository {
  /**
   * Firma un payload y retorna un token con expiración.
   * @param payload Datos a firmar
   * @param expiresInSeconds Segundos hasta la expiración
   */
  sign(payload: Record<string, unknown>, expiresInSeconds: number): Promise<string>;
}


