/**
 * Servicio de health del Gateway.
 * Expone una función para consultar `/health`.
 */
import { apiGet } from "../../api/http";
import type { HealthResponse } from "../../types/health";

/**
 * Consulta el estado del Gateway (`/health`).
 *
 * @returns {Promise<HealthResponse>} Respuesta con `{ ok: boolean }`
 */
export async function getHealth(): Promise<HealthResponse> {
  return apiGet<HealthResponse>("/health");
}
