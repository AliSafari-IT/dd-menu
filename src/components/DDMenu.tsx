import React, { useState, useRef, useEffect, useCallback } from "react";
import type { MenuItem } from "../types/menu.types";
import "../styles/dd-menu.css";

export type DDMenuVariant = "default" | "minimal" | "navbar" | "sidebar";
export type DDMenuSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface DDMenuProps {
  items: MenuItem[];
  theme?: "light" | "dark" | "auto";
  variant?: DDMenuVariant;
  size?: DDMenuSize;
  className?: string;
  style?: React.CSSProperties;
  trigger?: React.ReactNode;
  placement?:
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "left";
  onItemClick?: (item: MenuItem) => void;
  closeOnClick?: boolean;
  disabled?: boolean;
  hoverDelay?: number; // New prop for hover delay
  onHoverChange?: (isHovering: boolean) => void; // Event handler for hover state changes
  onFontSizeChange?: (fontSize: DDMenuSize) => void; // Event handler for font size changes
}

const DDMenu = ({
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
  hoverDelay = 150, // Default 150ms delay
  onHoverChange,
  onFontSizeChange,
}: DDMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
  const [hoveringItem, setHoveringItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonTriggerRef = useRef<HTMLButtonElement>(null);
  const customTriggerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const [isHovering] = useState(false);
  const [fontSize] = useState(size);

  // Call onHoverChange when isHovering state changes
  useEffect(() => {
    if (onHoverChange) {
      onHoverChange(isHovering);
    }
  }, [isHovering, onHoverChange]);

  // Call onFontSizeChange when fontSize state changes
  useEffect(() => {
    if (onFontSizeChange) {
      onFontSizeChange(fontSize);
    }
  }, [fontSize, onFontSizeChange]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Prevent immediate closure by checking if the click target is part of the menu system
      const currentTrigger = buttonTriggerRef.current || customTriggerRef.current;
      const isClickInsideTrigger = currentTrigger && currentTrigger.contains(event.target as Node);
      const isClickInsideMenu = menuRef.current && menuRef.current.contains(event.target as Node);
      
      // Only close if click is outside both trigger and menu
      if (!isClickInsideTrigger && !isClickInsideMenu) {
        setIsOpen(false);
        setOpenSubmenus(new Set());
        setHoveringItem(null);
        clearAllTimeouts();
      }
    };

    if (isOpen) {
      // Use mousedown for better responsiveness, but add a small delay to prevent immediate closure
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 50);
      
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        clearAllTimeouts();
      };
    }
    
    // Return empty cleanup function for when isOpen is false
    return () => {};
  }, [isOpen]);

  // Clear all timeouts
  const clearAllTimeouts = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    submenuTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
    submenuTimeoutRef.current.clear();
  }, []);

  // Handle submenu toggle with improved logic
  const toggleSubmenu = useCallback((id: string) => {
    setOpenSubmenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    
    // Ensure the item is being hovered
    setHoveringItem(id);
  }, []);

  // Improved submenu opening with delay
  const openSubmenuWithDelay = useCallback((id: string) => {
    // Clear any existing timeout for this submenu
    const existingTimeout = submenuTimeoutRef.current.get(id);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      submenuTimeoutRef.current.delete(id);
    }

    // For sidebar variant, open immediately
    if (variant === "sidebar") {
      setOpenSubmenus((prev) => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });
      return;
    }

    // Open immediately for better UX
    setOpenSubmenus((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  }, [variant]);

  // Improved submenu closing with delay
  const closeSubmenuWithDelay = useCallback((id: string) => {
    // Clear any opening timeout for this submenu
    const existingTimeout = submenuTimeoutRef.current.get(id);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      submenuTimeoutRef.current.delete(id);
    }

    // For sidebar variant, close immediately
    if (variant === "sidebar") {
      setOpenSubmenus((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      return;
    }

    // For other variants, use hover delay
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

  // Handle item click
  const handleItemClick = useCallback((item: MenuItem, event: React.MouseEvent) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.children?.length) {
      event.preventDefault();
      toggleSubmenu(item.id);
      return;
    }

    // Execute item onClick
    if (item.onClick) {
      item.onClick();
    }

    // Execute parent onItemClick
    if (onItemClick) {
      onItemClick(item);
    }

    // Close menu if specified
    if (closeOnClick) {
      setIsOpen(false);
      setOpenSubmenus(new Set());
      setHoveringItem(null);
      clearAllTimeouts();
    }
  }, [onItemClick, closeOnClick, toggleSubmenu, clearAllTimeouts]);

  // Handle mouse enter for items
  const handleItemMouseEnter = useCallback((item: MenuItem) => {
    setHoveringItem(item.id);
    
    if (item.children?.length && variant !== "sidebar") {
      // Immediately open submenu on hover
      openSubmenuWithDelay(item.id);
    }
  }, [variant, openSubmenuWithDelay]);

  // Handle mouse leave for items
  const handleItemMouseLeave = useCallback((item: MenuItem) => {
    if (hoveringItem === item.id) {
      setHoveringItem(null);
    }

    if (item.children?.length && variant !== "sidebar") {
      closeSubmenuWithDelay(item.id);
    }
  }, [hoveringItem, variant, closeSubmenuWithDelay]);

  // Handle submenu mouse enter (prevents closing)
  const handleSubmenuMouseEnter = useCallback((itemId: string) => {
    // Clear any pending close timeout
    const existingTimeout = submenuTimeoutRef.current.get(itemId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      submenuTimeoutRef.current.delete(itemId);
    }
    
    // Ensure the submenu stays open
    setOpenSubmenus((prev) => {
      const newSet = new Set(prev);
      newSet.add(itemId);
      return newSet;
    });
    
    // Keep track of hovering item
    setHoveringItem(itemId);
  }, []);

  // Handle submenu mouse leave
  const handleSubmenuMouseLeave = useCallback((itemId: string) => {
    if (variant !== "sidebar") {
      closeSubmenuWithDelay(itemId);
    }
  }, [variant, closeSubmenuWithDelay]);

  // Render menu items recursively
  const renderMenuItems = useCallback((
    menuItems: MenuItem[],
    level = 0
  ): React.ReactNode => {
    return menuItems.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isSubmenuOpen = openSubmenus.has(item.id);

      return (
        <li key={item.id} className="dd-menu__item-wrapper">
          <div
            className={`
              dd-menu__item
              ${item.disabled ? "dd-menu__item--disabled" : ""}
              ${item.active ? "dd-menu__item--active" : ""}
              ${hasChildren ? "dd-menu__item--has-children" : ""}
              ${level > 0 ? "dd-menu__item--nested" : ""}
              ${hoveringItem === item.id ? "dd-menu__item--hovering" : ""}
            `.trim()}
            onClick={(e) => handleItemClick(item, e)}
            onMouseEnter={() => handleItemMouseEnter(item)}
            onMouseLeave={() => handleItemMouseLeave(item)}
            role="menuitem"
            tabIndex={item.disabled ? -1 : 0}
            aria-disabled={item.disabled}
            aria-expanded={hasChildren ? isSubmenuOpen : undefined}
            aria-haspopup={hasChildren ? "menu" : undefined}
          >
            {item.icon && (
              <span className="dd-menu__item-icon">
                {typeof item.icon === "string" ? (
                  <span>{item.icon}</span>
                ) : (
                  item.icon
                )}
              </span>
            )}

            <span className="dd-menu__item-label">
              {item.link && !hasChildren ? (
                <a
                  href={item.link}
                  className="dd-menu__item-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.label}
                </a>
              ) : (
                item.label
              )}
            </span>

            {hasChildren && (
              <span className="dd-menu__item-arrow">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  style={{
                    transform: variant === "sidebar" && isSubmenuOpen ? "rotate(90deg)" : undefined,
                    transition: "transform 0.2s ease"
                  }}
                >
                  <path
                    d="M6 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>

          {hasChildren && (
            <ul
              className={`
                dd-menu__submenu
                dd-menu__submenu--level-${level + 1}
                ${isSubmenuOpen ? "dd-menu__submenu--open" : ""}
              `.trim()}
              role="menu"
              onMouseEnter={() => handleSubmenuMouseEnter(item.id)}
              onMouseLeave={() => handleSubmenuMouseLeave(item.id)}
            >
              {renderMenuItems(item.children!, level + 1)}
            </ul>
          )}
        </li>
      );
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

  // Default trigger if none provided
  const defaultTrigger = (
    <button
      ref={buttonTriggerRef}
      className="dd-menu__trigger"
      onClick={(e) => {
        e.preventDefault(); // Prevent default browser behavior
        e.stopPropagation(); // Stop event propagation
        if (!disabled) {
          setIsOpen(!isOpen);
        }
      }}
      disabled={disabled}
      aria-expanded={isOpen}
      aria-haspopup="menu"
    >
      <span>Menu</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  return (
    <div
      className={`
        dd-menu 
        dd-menu--${variant} 
        dd-menu--${size} 
        dd-menu--${theme} 
        ${isOpen ? "dd-menu--open" : ""}
        ${disabled ? "dd-menu--disabled" : ""}
        ${className}
      `.trim()}
      style={style}
      data-theme={theme}
    >
      {trigger ? (
        <div
          ref={customTriggerRef}
          onClick={(e) => {
            e.preventDefault(); // Prevent default browser behavior
            e.stopPropagation(); // Stop propagation to parent elements
            if (!disabled) {
              setIsOpen(!isOpen);
            }
          }}
          className="dd-menu__custom-trigger"
        >
          {trigger}
        </div>
      ) : (
        defaultTrigger
      )}

      {isOpen && (
        <div
          ref={menuRef}
          className={`dd-menu__content dd-menu__content--${placement}`}
          role="menu"
          aria-orientation="vertical"
          onClick={(e) => e.stopPropagation()} /* Prevent clicks inside menu from bubbling up */
        >
          <ul className="dd-menu__list" role="none">
            {renderMenuItems(items)}
          </ul>
        </div>
      )}
    </div>
  );
};

export { DDMenu };
export default DDMenu;
