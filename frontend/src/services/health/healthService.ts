/**
 * Servicio de health del Gateway.
 * Expone una función para consultar `/health`.
 */
import { getApiBaseUrl } from "../../utils/env";
/**
 * Respuesta del endpoint `/health`.
 */
export interface HealthResponse {
  ok: boolean;
}

/**
 * Llama al endpoint `/health` del Gateway y retorna su JSON.
 */
export async function getHealth(): Promise<HealthResponse> {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/health`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  return (await response.json()) as HealthResponse;
}


