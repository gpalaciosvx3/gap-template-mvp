/**
 * Componente Home minimalista.
 * Muestra un contenedor con el texto "HOLA MUNDO".
 */
import { Box, Typography } from "@mui/material";
import React from "react";

import type { HomeProps } from "../../types/components";
import "./Home.css";

/**
 * Renderiza un contenedor con el saludo inicial.
 */
export default function Home({ title }: HomeProps): JSX.Element {
  return (
    <Box className="home__root">
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
    </Box>
  );
}
