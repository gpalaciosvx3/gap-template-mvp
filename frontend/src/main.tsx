/**
 * Punto de entrada del Frontend (Vite + React).
 * Monta la aplicación en el elemento raíz.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { AppTheme } from "./theme";
import HomePage from "./pages/home/HomePage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  </React.StrictMode>
);


