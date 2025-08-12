/**
 * Tipos compartidos para funcionalidad de Health en el Frontend.
 */

/** Respuesta del endpoint `/health` del Gateway */
export interface HealthResponse {
  ok: boolean;
}

/** Estado expuesto por el hook `useHealth` */
export interface UseHealthState {
  data: HealthResponse | null;
  isLoading: boolean;
  error: string | null;
}
