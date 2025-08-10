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
type DDMenuSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
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
    onHoverChange?: (isHovering: boolean) => void;
    onFontSizeChange?: (fontSize: DDMenuSize) => void;
}
declare const DDMenu: ({ items, theme, variant, size, className, style, trigger, placement, onItemClick, closeOnClick, disabled, hoverDelay, onHoverChange, onFontSizeChange, }: DDMenuProps) => react_jsx_runtime.JSX.Element;

type DDSearchableVariant = "default" | "minimal" | "outlined" | "filled";
type DDSearchableSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
interface DDSearchableProps {
    items: MenuItem[];
    theme?: "light" | "dark" | "auto";
    variant?: DDSearchableVariant;
    size?: DDSearchableSize;
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    onItemSelect?: (item: MenuItem) => void;
    onSearchChange?: (searchTerm: string) => void;
    disabled?: boolean;
    clearable?: boolean;
    maxHeight?: number;
    noResultsText?: string;
    searchKeys?: (keyof MenuItem)[];
    caseSensitive?: boolean;
    minSearchLength?: number;
    debounceMs?: number;
    selectedItem?: MenuItem | null;
    allowCustomValue?: boolean;
    onCustomValue?: (value: string) => void;
}
declare const DDSearchable: ({ items, theme, variant, size, className, style, placeholder, onItemSelect, onSearchChange, disabled, clearable, maxHeight, noResultsText, searchKeys, caseSensitive, minSearchLength, debounceMs, selectedItem, allowCustomValue, onCustomValue, }: DDSearchableProps) => react_jsx_runtime.JSX.Element;

export { DDMenu, DDMenu as DDMenuDefault, type DDMenuPlacement, type DDMenuSize, type DDMenuTheme, type DDMenuVariant, DDSearchable, DDSearchable as DDSearchableDefault, type DDSearchableSize, type DDSearchableVariant, type MenuItem, DDMenu as default };
