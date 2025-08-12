/**
 * Presenter que construye y envía respuestas HTTP homogéneas.
 */
import type { Response } from 'express';

import type { ApiResponse } from '../dto/ApiResponse';

export class ResponsePresenter {
  /**
   * Construye una respuesta exitosa
   */
  static success<T>(data: T, meta?: Record<string, unknown>): ApiResponse<T> {
    return { success: true, data, meta };
  }

  /**
   * Construye una respuesta de error con código y mensaje
   */
  static fail(error: { code: string; message: string; details?: unknown }): ApiResponse<never> {
    return { success: false, error };
  }

  static ok<T>(res: Response, data: T, meta?: Record<string, unknown>): Response {
    return res.status(200).json(ResponsePresenter.success(data, meta));
  }

  static badRequest(
    res: Response,
    error: { code: string; message: string; details?: unknown },
  ): Response {
    return res.status(400).json(ResponsePresenter.fail(error));
  }

  static internalError(
    res: Response,
    error: { code: string; message: string; details?: unknown },
  ): Response {
    return res.status(500).json(ResponsePresenter.fail(error));
  }

  static error(
    res: Response,
    status: number,
    error: { code: string; message: string; details?: unknown },
  ): Response {
    return res.status(status).json(ResponsePresenter.fail(error));
  }
}
