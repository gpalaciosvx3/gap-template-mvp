/**
 * Middleware de validación con Joi para request body.
 */
import type { RequestHandler } from 'express';
import type Joi from 'joi';

import { ValidationError } from '../../backend/common/errors/ValidationError';

/**
 * Crea un middleware que valida el body contra un esquema Joi.
 * @param schema Esquema Joi para el body
 * @returns RequestHandler que valida y normaliza el body
 */
export function validateBody(schema: Joi.ObjectSchema): RequestHandler {
  return (req, _res, next) => {
    const { value, error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      const details = error.details?.map((d) => d.message) ?? [];
      return next(new ValidationError('VALIDATION_ERROR', 400, 'Body inválido', details));
    }

    req.body = value;
    return next();
  };
}


