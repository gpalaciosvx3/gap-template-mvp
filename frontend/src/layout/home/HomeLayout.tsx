/**
 * Layout específico para el Home.
 * Incluye su propio Header y Footer.
 */
import { Container, Box } from "@mui/material";
import React from "react";

import HomeFooter from "../../components/homeFooter/HomeFooter";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import type { HomeLayoutProps } from "../../types/components";
import "./HomeLayout.css";

/**
 * Composición base del layout Home.
 */
export default function HomeLayout({
  children,
  header,
  footer,
}: HomeLayoutProps): JSX.Element {
  return (
    <Box display="flex" minHeight="100vh" flexDirection="column">
      <HomeHeader {...header} />
      <Container component="main" className="homeLayout__content">
        {children}
      </Container>
      <HomeFooter {...footer} />
    </Box>
  );
}
