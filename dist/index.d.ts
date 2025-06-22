import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface MenuItem {
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
type DDMenuTheme = "light" | "dark" | "auto";
type DDMenuPlacement = "bottom" | "bottom-start" | "bottom-end" | "top" | "top-start" | "top-end" | "right" | "left";

type DDMenuVariant = "default" | "minimal" | "navbar" | "sidebar";
type DDMenuSize = "sm" | "md" | "lg";
interface DDMenuProps {
    items: MenuItem[];
    theme?: "light" | "dark" | "auto";
    variant?: DDMenuVariant;
    size?: DDMenuSize;
    className?: string;
    style?: React.CSSProperties;
    trigger?: React.ReactNode;
    placement?: "bottom" | "bottom-start" | "bottom-end" | "top" | "top-start" | "top-end" | "right" | "left";
    onItemClick?: (item: MenuItem) => void;
    closeOnClick?: boolean;
    disabled?: boolean;
    hoverDelay?: number;
}
declare const DDMenu: ({ items, theme, variant, size, className, style, trigger, placement, onItemClick, closeOnClick, disabled, hoverDelay, }: DDMenuProps) => react_jsx_runtime.JSX.Element;

export { DDMenu, DDMenu as DDMenuDefault, type DDMenuPlacement, type DDMenuSize, type DDMenuTheme, type DDMenuVariant, type MenuItem, DDMenu as default };
