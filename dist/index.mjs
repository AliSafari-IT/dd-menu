// src/components/DDMenu.tsx
import { useState, useRef, useEffect, useCallback } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var DDMenu = ({
  items,
  theme = "auto",
  variant = "default",
  size = "md",
  className = "",
  style = {},
  trigger,
  placement = "bottom-start",
  onItemClick,
  closeOnClick = true,
  disabled = false,
  hoverDelay = 150,
  // Default 150ms delay
  onHoverChange,
  onFontSizeChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState(/* @__PURE__ */ new Set());
  const [hoveringItem, setHoveringItem] = useState(null);
  const menuRef = useRef(null);
  const buttonTriggerRef = useRef(null);
  const customTriggerRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const submenuTimeoutRef = useRef(/* @__PURE__ */ new Map());
  const [isHovering, setIsHovering] = useState(false);
  const [fontSize, setFontSize] = useState(size);
  useEffect(() => {
    if (onHoverChange) {
      onHoverChange(isHovering);
    }
  }, [isHovering, onHoverChange]);
  useEffect(() => {
    if (onFontSizeChange) {
      onFontSizeChange(fontSize);
    }
  }, [fontSize, onFontSizeChange]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const currentTrigger = buttonTriggerRef.current || customTriggerRef.current;
      const isClickInsideTrigger = currentTrigger && currentTrigger.contains(event.target);
      const isClickInsideMenu = menuRef.current && menuRef.current.contains(event.target);
      if (!isClickInsideTrigger && !isClickInsideMenu) {
        setIsOpen(false);
        setOpenSubmenus(/* @__PURE__ */ new Set());
        setHoveringItem(null);
        clearAllTimeouts();
      }
    };
    if (isOpen) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 50);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        clearAllTimeouts();
      };
    }
  }, [isOpen]);
  const clearAllTimeouts = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    submenuTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
    submenuTimeoutRef.current.clear();
  }, []);
  const toggleSubmenu = useCallback((id) => {
    setOpenSubmenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    setHoveringItem(id);
  }, []);
  const openSubmenuWithDelay = useCallback((id) => {
    const existingTimeout = submenuTimeoutRef.current.get(id);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      submenuTimeoutRef.current.delete(id);
    }
    if (variant === "sidebar") {
      setOpenSubmenus((prev) => /* @__PURE__ */ new Set([...prev, id]));
      return;
    }
    setOpenSubmenus((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  }, [variant]);
  const closeSubmenuWithDelay = useCallback((id) => {
    const existingTimeout = submenuTimeoutRef.current.get(id);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      submenuTimeoutRef.current.delete(id);
    }
    if (variant === "sidebar") {
      setOpenSubmenus((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      return;
    }
    const timeout = setTimeout(() => {
      setOpenSubmenus((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      submenuTimeoutRef.current.delete(id);
    }, hoverDelay);
    submenuTimeoutRef.current.set(id, timeout);
  }, [variant, hoverDelay]);
  const handleItemClick = useCallback((item, event) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    if (item.children?.length) {
      event.preventDefault();
      toggleSubmenu(item.id);
      return;
    }
    if (item.onClick) {
      item.onClick();
    }
    if (onItemClick) {
      onItemClick(item);
    }
    if (closeOnClick) {
      setIsOpen(false);
      setOpenSubmenus(/* @__PURE__ */ new Set());
      setHoveringItem(null);
      clearAllTimeouts();
    }
  }, [onItemClick, closeOnClick, toggleSubmenu, clearAllTimeouts]);
  const handleItemMouseEnter = useCallback((item) => {
    setHoveringItem(item.id);
    if (item.children?.length && variant !== "sidebar") {
      openSubmenuWithDelay(item.id);
    }
  }, [variant, openSubmenuWithDelay]);
  const handleItemMouseLeave = useCallback((item) => {
    if (hoveringItem === item.id) {
      setHoveringItem(null);
    }
    if (item.children?.length && variant !== "sidebar") {
      closeSubmenuWithDelay(item.id);
    }
  }, [hoveringItem, variant, closeSubmenuWithDelay]);
  const handleSubmenuMouseEnter = useCallback((itemId) => {
    const existingTimeout = submenuTimeoutRef.current.get(itemId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      submenuTimeoutRef.current.delete(itemId);
    }
    setOpenSubmenus((prev) => {
      const newSet = new Set(prev);
      newSet.add(itemId);
      return newSet;
    });
    setHoveringItem(itemId);
  }, []);
  const handleSubmenuMouseLeave = useCallback((itemId) => {
    if (variant !== "sidebar") {
      closeSubmenuWithDelay(itemId);
    }
  }, [variant, closeSubmenuWithDelay]);
  const renderMenuItems = useCallback((menuItems, level = 0) => {
    return menuItems.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isSubmenuOpen = openSubmenus.has(item.id);
      return /* @__PURE__ */ jsxs("li", { className: "dd-menu__item-wrapper", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `
              dd-menu__item
              ${item.disabled ? "dd-menu__item--disabled" : ""}
              ${item.active ? "dd-menu__item--active" : ""}
              ${hasChildren ? "dd-menu__item--has-children" : ""}
              ${level > 0 ? "dd-menu__item--nested" : ""}
              ${hoveringItem === item.id ? "dd-menu__item--hovering" : ""}
            `.trim(),
            onClick: (e) => handleItemClick(item, e),
            onMouseEnter: () => handleItemMouseEnter(item),
            onMouseLeave: () => handleItemMouseLeave(item),
            role: "menuitem",
            tabIndex: item.disabled ? -1 : 0,
            "aria-disabled": item.disabled,
            "aria-expanded": hasChildren ? isSubmenuOpen : void 0,
            "aria-haspopup": hasChildren ? "menu" : void 0,
            children: [
              item.icon && /* @__PURE__ */ jsx("span", { className: "dd-menu__item-icon", children: typeof item.icon === "string" ? /* @__PURE__ */ jsx("span", { children: item.icon }) : item.icon }),
              /* @__PURE__ */ jsx("span", { className: "dd-menu__item-label", children: item.link && !hasChildren ? /* @__PURE__ */ jsx(
                "a",
                {
                  href: item.link,
                  className: "dd-menu__item-link",
                  onClick: (e) => e.stopPropagation(),
                  children: item.label
                }
              ) : item.label }),
              hasChildren && /* @__PURE__ */ jsx("span", { className: "dd-menu__item-arrow", children: /* @__PURE__ */ jsx(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 16 16",
                  fill: "currentColor",
                  style: {
                    transform: variant === "sidebar" && isSubmenuOpen ? "rotate(90deg)" : void 0,
                    transition: "transform 0.2s ease"
                  },
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M6 4l4 4-4 4",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      fill: "none",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }
                  )
                }
              ) })
            ]
          }
        ),
        hasChildren && /* @__PURE__ */ jsx(
          "ul",
          {
            className: `
                dd-menu__submenu
                dd-menu__submenu--level-${level + 1}
                ${isSubmenuOpen ? "dd-menu__submenu--open" : ""}
              `.trim(),
            role: "menu",
            onMouseEnter: () => handleSubmenuMouseEnter(item.id),
            onMouseLeave: () => handleSubmenuMouseLeave(item.id),
            children: renderMenuItems(item.children, level + 1)
          }
        )
      ] }, item.id);
    });
  }, [
    openSubmenus,
    hoveringItem,
    handleItemClick,
    handleItemMouseEnter,
    handleItemMouseLeave,
    handleSubmenuMouseEnter,
    handleSubmenuMouseLeave,
    variant
  ]);
  const defaultTrigger = /* @__PURE__ */ jsxs(
    "button",
    {
      ref: buttonTriggerRef,
      className: "dd-menu__trigger",
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsOpen(!isOpen);
        }
      },
      disabled,
      "aria-expanded": isOpen,
      "aria-haspopup": "menu",
      children: [
        /* @__PURE__ */ jsx("span", { children: "Menu" }),
        /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M4 6l4 4 4-4",
            stroke: "currentColor",
            strokeWidth: "1.5",
            fill: "none",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) })
      ]
    }
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `
        dd-menu 
        dd-menu--${variant} 
        dd-menu--${size} 
        dd-menu--${theme} 
        ${isOpen ? "dd-menu--open" : ""}
        ${disabled ? "dd-menu--disabled" : ""}
        ${className}
      `.trim(),
      style,
      "data-theme": theme,
      children: [
        trigger ? /* @__PURE__ */ jsx(
          "div",
          {
            ref: customTriggerRef,
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!disabled) {
                setIsOpen(!isOpen);
              }
            },
            className: "dd-menu__custom-trigger",
            children: trigger
          }
        ) : defaultTrigger,
        isOpen && /* @__PURE__ */ jsx(
          "div",
          {
            ref: menuRef,
            className: `dd-menu__content dd-menu__content--${placement}`,
            role: "menu",
            "aria-orientation": "vertical",
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsx("ul", { className: "dd-menu__list", role: "none", children: renderMenuItems(items) })
          }
        )
      ]
    }
  );
};
var DDMenu_default = DDMenu;
export {
  DDMenu,
  DDMenu_default as DDMenuDefault,
  DDMenu as default
};
