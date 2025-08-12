/**
 * Página principal de la aplicación.
 * Renderiza el componente `Home` y dispara la consulta de salud del Gateway.
 *
 * @returns {JSX.Element} Estructura de la página Home con estado de salud
 */
import { Typography, Box, Alert } from '@mui/material';
import React from 'react';

import Home from '../../components/home/Home';
import { useHealth } from '../../hooks/health/useHealth';
import HomeLayout from '../../layout/home/HomeLayout';
import './HomePage.css';

export default function HomePage(): JSX.Element {
  const { data, isLoading, error } = useHealth();

  return (
    <HomeLayout header={{ title: 'GAP Template MVP' }} footer={{ text: 'GAP Template MVP' }}>
      <Box className="homePage__container">
        <Home title="HOLA MUNDO" />
        <Typography variant="h6" component="h2">
          Estado del Gateway
        </Typography>
        {isLoading && <Typography>Cargando...</Typography>}
        {error && <Alert severity="error">No se pudo obtener el estado: {error}</Alert>}
        {data && <Alert severity="success">{JSON.stringify(data)}</Alert>}
      </Box>
    </HomeLayout>
  );
}
