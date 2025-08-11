/**
 * Error de validación para requests inválidos.
 */
import { AppError } from "./AppError";

export class ValidationError extends AppError {
  details?: unknown;
  constructor(
    code: string,
    status: number,
    message: string,
    details?: unknown,
  ) {
    super(code, status, message);
    this.details = details;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
