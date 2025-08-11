/**
 * Layout específico para el Home.
 * Incluye su propio Header y Footer.
 */
import React from "react";
import { Container, Box } from "@mui/material";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import HomeFooter from "../../components/homeFooter/HomeFooter";
import type { HomeHeaderProps, HomeFooterProps } from "../../types/components";
import "./HomeLayout.css";

export interface HomeLayoutProps {
  children: React.ReactNode;
  header: HomeHeaderProps;
  footer: HomeFooterProps;
}

/**
 * Composición base del layout Home.
 */
export default function HomeLayout({ children, header, footer }: HomeLayoutProps): JSX.Element {
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


