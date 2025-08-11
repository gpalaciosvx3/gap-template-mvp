/**
 * Header del layout Home (Material UI).
 */
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "./HomeHeader.css";
import type { HomeHeaderProps } from "../../types/components";

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


