/**
 * Adaptador de infraestructura para emitir JWT usando jsonwebtoken.
 */
import jwt from 'jsonwebtoken';

import type { TokenRepository } from '../../domain/repositories/TokenRepository';


export class JwtTokenProvider implements TokenRepository {
  private readonly secret: string;

  /**
   * @param secret Clave secreta para firmar tokens
   */
  constructor(secret?: string) {
    this.secret = secret ?? process.env.JWT_SECRET ?? 'dev-secret';
  }

  /**
   * Firma un payload en formato JWT con expiración.
   */
  async sign(payload: Record<string, unknown>, expiresInSeconds: number): Promise<string> {
    const token = jwt.sign(payload, this.secret, { expiresIn: expiresInSeconds });
    return token;
  }
}


