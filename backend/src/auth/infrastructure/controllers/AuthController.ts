/**
 * Controlador HTTP del módulo Auth.
 * Maneja endpoints de autenticación delegando a casos de uso y enviando errores al middleware.
 */
import type { RequestHandler } from "express";

import { ResponsePresenter } from "../../../../common/presenters/ResponsePresenter";
import type { LoginUseCase } from "../../application/usecases/LoginUseCase";

export class AuthController {
  private readonly loginUseCase: LoginUseCase;

  /**
   * @param loginUseCase Caso de uso de login
   */
  constructor(loginUseCase: LoginUseCase) {
    this.loginUseCase = loginUseCase;
  }

  /**
   * Handler POST /login.
   * @param req Request con body validado por middleware
   * @param res Response
   * @param next Next function para propagar errores
   */
  login: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.loginUseCase.execute(req.body);
      return ResponsePresenter.ok(res, result);
    } catch (error) {
      return next(error);
    }
  };
}
