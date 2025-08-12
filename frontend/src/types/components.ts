/**
 * Tipos compartidos de componentes de UI.
 */

import type React from "react";

/** Props para `HomeHeader` */
export interface HomeHeaderProps {
  title: string;
}

/** Props para `HomeFooter` */
export interface HomeFooterProps {
  text: string;
}

/** Props para `Home` */
export interface HomeProps {
  title: string;
}

/** Props para `HomeLayout` */
export interface HomeLayoutProps {
  children: React.ReactNode;
  header: HomeHeaderProps;
  footer: HomeFooterProps;
}
