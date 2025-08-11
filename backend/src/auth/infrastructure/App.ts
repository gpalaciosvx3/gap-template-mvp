/**
 * Punto de entrada HTTP del módulo Auth.
 * Reexporta handlers listos para ser usados por el gateway.
 */
import type { RequestHandler } from "express";

import { useCases } from "./adapters/AuthContainer";
import { AuthController } from "./controllers/AuthController";

const authController = new AuthController(useCases.loginUseCase);

/**
 * Handler POST /login.
 */
export const loginHandler: RequestHandler = authController.login;
