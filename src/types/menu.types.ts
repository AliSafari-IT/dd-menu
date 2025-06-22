import React from "react";

export interface MenuItem {
  id: string;
  label: string;
  link?: string;
  onClick?: () => void;
  icon?: React.ReactNode | string;
  disabled?: boolean;
  active?: boolean;
  children?: MenuItem[];
  className?: string;
  style?: React.CSSProperties;
}

export type DDMenuVariant = "default" | "minimal" | "navbar" | "sidebar";
export type DDMenuSize = "sm" | "md" | "lg";
export type DDMenuTheme = "light" | "dark" | "auto";
export type DDMenuPlacement = "bottom" | "bottom-start" | "bottom-end" | "top" | "top-start" | "top-end" | "right" | "left";
