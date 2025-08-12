/**
 * Servicio de health del Gateway.
 * Expone una función para consultar `/health`.
 */
import { apiGet } from "../../api/http";
import type { HealthResponse } from "../../types/health";

/**
 * Obtiene el estado de salud del Gateway.
 *
 * @returns {Promise<HealthResponse>} Objeto con el estado `{ ok: boolean }`
 */
export async function getHealth(): Promise<HealthResponse> {
  return apiGet<HealthResponse>("/health");
}
