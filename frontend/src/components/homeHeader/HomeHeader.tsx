/**
 * Header del layout Home.
 * Muestra la barra superior con el título de la aplicación.
 *
 * @param {{ title: string }} props Propiedades del componente
 * @returns {JSX.Element} Barra de navegación superior
 */
import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

import type { HomeHeaderProps } from "../../types/components";
import "./HomeHeader.css";

export default function HomeHeader({ title }: HomeHeaderProps): JSX.Element {
  return (
    <AppBar position="static" color="primary">
      <Toolbar className="homeHeader__toolbar">
        <Typography variant="h6" component="div" className="homeHeader__title">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
