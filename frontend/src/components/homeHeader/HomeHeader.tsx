/**
 * Header del layout Home (Material UI).
 */
import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

import type { HomeHeaderProps } from "../../types/components";
import "./HomeHeader.css";

/**
 * Barra superior con el nombre de la app.
 */
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
