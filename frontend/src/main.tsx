/**
 * Punto de entrada del Frontend (Vite + React).
 * Monta la aplicación en el elemento raíz.
 */
import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';

import HomePage from './pages/home/HomePage';
import { AppTheme } from './theme/app/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  </React.StrictMode>,
);
