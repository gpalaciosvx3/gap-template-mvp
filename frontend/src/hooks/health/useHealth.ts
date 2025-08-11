/**
 * Hook para obtener el estado de salud del Gateway (`/health`).
 * Encapsula la lógica de carga, datos y error para su consumo en UI.
 */
import { useEffect, useState } from "react";

import { getHealth } from "../../services/health";
import type { HealthResponse } from "../../services/health/types";

interface UseHealthState {
  data: HealthResponse | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Realiza la llamada al servicio de salud del Gateway y maneja su ciclo de vida.
 */
export function useHealth(): UseHealthState {
  const [state, setState] = useState<UseHealthState>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isActive = true;
    getHealth()
      .then((resp) => {
        if (!isActive) return;
        setState({ data: resp, isLoading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!isActive) return;
        const message = err instanceof Error ? err.message : "Error desconocido";
        setState({ data: null, isLoading: false, error: message });
      });

    return () => {
      isActive = false;
    };
  }, []);

  return state;
}


