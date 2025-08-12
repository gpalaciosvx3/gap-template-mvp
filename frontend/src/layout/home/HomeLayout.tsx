/**
 * Layout específico para el Home.
 * Incluye su propio Header y Footer.
 *
 * @param {{ children: React.ReactNode, header: import("../../types/components").HomeHeaderProps, footer: import("../../types/components").HomeFooterProps }} props Propiedades del layout
 * @returns {JSX.Element} Composición de layout para la página Home
 */
import { Container, Box } from "@mui/material";
import React from "react";

import HomeFooter from "../../components/homeFooter/HomeFooter";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import type { HomeLayoutProps } from "../../types/components";
import "./HomeLayout.css";

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
