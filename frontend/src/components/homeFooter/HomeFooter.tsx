/**
 * Footer del layout Home.
 * Muestra un texto en el pie de página.
 *
 * @param {{ text: string }} props Propiedades del componente
 * @returns {JSX.Element} Nodo JSX del pie de página
 */
import { Box, Typography } from '@mui/material';
import React from 'react';

import type { HomeFooterProps } from '../../types/components';
import './HomeFooter.css';

export default function HomeFooter({ text }: HomeFooterProps): JSX.Element {
  return (
    <Box component="footer" className="homeFooter__root">
      <Typography variant="body2" color="text.secondary" align="center">
        {text}
      </Typography>
    </Box>
  );
}
