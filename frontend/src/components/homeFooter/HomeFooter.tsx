/**
 * Footer del layout Home (Material UI).
 */
import { Box, Typography } from "@mui/material";
import React from "react";

import type { HomeFooterProps } from "../../types/components";
import "./HomeFooter.css";

/**
 * Pie de página con una leyenda mínima.
 */
export default function HomeFooter({ text }: HomeFooterProps): JSX.Element {
  return (
    <Box component="footer" className="homeFooter__root">
      <Typography variant="body2" color="text.secondary" align="center">
        {text}
      </Typography>
    </Box>
  );
}
