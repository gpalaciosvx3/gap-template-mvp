/**
 * Esquemas de validación para el módulo Auth en el gateway.
 */
import Joi from "joi";

export const loginBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});
