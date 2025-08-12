/**
 * Componente Home minimalista.
 * Renderiza un encabezado principal con el título recibido por props.
 *
 * @param {{ title: string }} props Propiedades del componente
 * @returns {JSX.Element} Nodo JSX con el contenido del Home
 */
import { Box, Typography } from '@mui/material';
import React from 'react';

import type { HomeProps } from '../../types/components';
import './Home.css';

export default function Home({ title }: HomeProps): JSX.Element {
  return (
    <Box className="home__root">
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
    </Box>
  );
}
