"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DDMenu: () => DDMenu,
  DDMenuDefault: () => DDMenu_default,
  default: () => DDMenu
});
module.exports = __toCommonJS(src_exports);

// src/components/DDMenu.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
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
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const [openSubmenus, setOpenSubmenus] = (0, import_react.useState)(/* @__PURE__ */ new Set());
  const [hoveringItem, setHoveringItem] = (0, import_react.useState)(null);
  const menuRef = (0, import_react.useRef)(null);
  const buttonTriggerRef = (0, import_react.useRef)(null);
  const customTriggerRef = (0, import_react.useRef)(null);
  const hoverTimeoutRef = (0, import_react.useRef)(null);
  const submenuTimeoutRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
  const [isHovering, setIsHovering] = (0, import_react.useState)(false);
  const [fontSize, setFontSize] = (0, import_react.useState)(size);
  (0, import_react.useEffect)(() => {
    if (onHoverChange) {
      onHoverChange(isHovering);
    }
  }, [isHovering, onHoverChange]);
  (0, import_react.useEffect)(() => {
    if (onFontSizeChange) {
      onFontSizeChange(fontSize);
    }
  }, [fontSize, onFontSizeChange]);
  (0, import_react.useEffect)(() => {
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
  const clearAllTimeouts = (0, import_react.useCallback)(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    submenuTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
    submenuTimeoutRef.current.clear();
  }, []);
  const toggleSubmenu = (0, import_react.useCallback)((id) => {
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
  const openSubmenuWithDelay = (0, import_react.useCallback)((id) => {
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
  const closeSubmenuWithDelay = (0, import_react.useCallback)((id) => {
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
  const handleItemClick = (0, import_react.useCallback)((item, event) => {
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
  const handleItemMouseEnter = (0, import_react.useCallback)((item) => {
    setHoveringItem(item.id);
    if (item.children?.length && variant !== "sidebar") {
      openSubmenuWithDelay(item.id);
    }
  }, [variant, openSubmenuWithDelay]);
  const handleItemMouseLeave = (0, import_react.useCallback)((item) => {
    if (hoveringItem === item.id) {
      setHoveringItem(null);
    }
    if (item.children?.length && variant !== "sidebar") {
      closeSubmenuWithDelay(item.id);
    }
  }, [hoveringItem, variant, closeSubmenuWithDelay]);
  const handleSubmenuMouseEnter = (0, import_react.useCallback)((itemId) => {
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
  const handleSubmenuMouseLeave = (0, import_react.useCallback)((itemId) => {
    if (variant !== "sidebar") {
      closeSubmenuWithDelay(itemId);
    }
  }, [variant, closeSubmenuWithDelay]);
  const renderMenuItems = (0, import_react.useCallback)((menuItems, level = 0) => {
    return menuItems.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isSubmenuOpen = openSubmenus.has(item.id);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "dd-menu__item-wrapper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
              item.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dd-menu__item-icon", children: typeof item.icon === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }) : item.icon }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dd-menu__item-label", children: item.link && !hasChildren ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "a",
                {
                  href: item.link,
                  className: "dd-menu__item-link",
                  onClick: (e) => e.stopPropagation(),
                  children: item.label
                }
              ) : item.label }),
              hasChildren && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dd-menu__item-arrow", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
        hasChildren && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  const defaultTrigger = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Menu" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
        trigger ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
        isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            ref: menuRef,
            className: `dd-menu__content dd-menu__content--${placement}`,
            role: "menu",
            "aria-orientation": "vertical",
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "dd-menu__list", role: "none", children: renderMenuItems(items) })
          }
        )
      ]
    }
  );
};
var DDMenu_default = DDMenu;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DDMenu,
  DDMenuDefault
});
