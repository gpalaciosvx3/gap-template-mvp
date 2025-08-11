/**
 * Esquemas Joi centralizados para validaciones del gateway.
 */
import Joi from 'joi';

/**
 * Esquema del body de login.
 */
export const loginBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});


