import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { MenuItem } from "../types/menu.types";
import "../styles/dd-menu.css";

export type DDSearchableVariant = "default" | "minimal" | "outlined" | "filled";
export type DDSearchableSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

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

const DDSearchable = ({
  items,
  theme = "auto",
  variant = "default",
  size = "md",
  className = "",
  style = {},
  placeholder = "Search...",
  onItemSelect,
  onSearchChange,
  disabled = false,
  clearable = true,
  maxHeight = 300,
  noResultsText = "No results found",
  searchKeys = ["label", "id"],
  caseSensitive = false,
  minSearchLength = 0,
  debounceMs = 300,
  selectedItem = null,
  allowCustomValue = false,
  onCustomValue,
}: DDSearchableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      onSearchChange?.(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs, onSearchChange]);

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (debouncedSearchTerm.length < minSearchLength) {
      return items;
    }

    const searchValue = caseSensitive ? debouncedSearchTerm : debouncedSearchTerm.toLowerCase();
    
    const filterRecursive = (itemList: MenuItem[]): MenuItem[] => {
      return itemList.reduce((acc: MenuItem[], item) => {
        const matchesSearch = searchKeys.some(key => {
          const value = item[key];
          if (typeof value === 'string') {
            const searchIn = caseSensitive ? value : value.toLowerCase();
            return searchIn.includes(searchValue);
          }
          return false;
        });

        if (matchesSearch) {
          acc.push(item);
        } else if (item.children) {
          const filteredChildren = filterRecursive(item.children);
          if (filteredChildren.length > 0) {
            acc.push({ ...item, children: filteredChildren });
          }
        }

        return acc;
      }, []);
    };

    return filterRecursive(items);
  }, [items, debouncedSearchTerm, searchKeys, caseSensitive, minSearchLength]);

  // Flatten items for keyboard navigation
  const flattenedItems = useMemo(() => {
    const flatten = (itemList: MenuItem[], depth = 0): Array<MenuItem & { depth: number }> => {
      return itemList.reduce((acc, item) => {
        if (!item.disabled) {
          acc.push({ ...item, depth });
        }
        if (item.children) {
          acc.push(...flatten(item.children, depth + 1));
        }
        return acc;
      }, [] as Array<MenuItem & { depth: number }>);
    };
    return flatten(filteredItems);
  }, [filteredItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setHighlightedIndex(-1);
    if (!isOpen && value) {
      setIsOpen(true);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    
    setSearchTerm(item.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onItemSelect?.(item);
    item.onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev < flattenedItems.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : flattenedItems.length - 1
          );
        }
        break;
      case "Enter":
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && flattenedItems[highlightedIndex]) {
          handleItemClick(flattenedItems[highlightedIndex]);
        } else if (allowCustomValue && searchTerm && onCustomValue) {
          onCustomValue(searchTerm);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
      case "Tab":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
    onItemSelect?.(null as any);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Update search term when selectedItem changes
  useEffect(() => {
    if (selectedItem) {
      setSearchTerm(selectedItem.label);
    } else if (selectedItem === null) {
      setSearchTerm("");
    }
  }, [selectedItem]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth"
        });
      }
    }
  }, [highlightedIndex]);

  const renderItem = (item: MenuItem & { depth: number }, index: number) => {
    const isHighlighted = index === highlightedIndex;
    const itemClasses = [
      "dd-menu-item",
      item.disabled && "dd-menu-item--disabled",
      item.active && "dd-menu-item--active",
      isHighlighted && "dd-menu-item--highlighted",
      item.className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <li
        key={`${item.id}-${item.depth}`}
        className={itemClasses}
        style={{
          paddingLeft: `${0.5 + item.depth * 1.5}rem`,
          ...item.style,
        }}
        onClick={() => handleItemClick(item)}
        onMouseEnter={() => setHighlightedIndex(index)}
      >
        {item.icon && (
          <span className="dd-menu-item__icon">
            {typeof item.icon === "string" ? item.icon : item.icon}
          </span>
        )}
        <span className="dd-menu-item__label">{item.label}</span>
      </li>
    );
  };

  const containerClasses = [
    "dd-searchable",
    `dd-searchable--${variant}`,
    `dd-searchable--${size}`,
    `dd-searchable--${theme}`,
    disabled && "dd-searchable--disabled",
    isOpen && "dd-searchable--open",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      style={style}
    >
      <div className="dd-searchable__input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="dd-searchable__input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
          autoComplete="off"
        />
        {clearable && searchTerm && (
          <button
            type="button"
            className="dd-searchable__clear"
            onClick={handleClear}
            tabIndex={-1}
          >
            ✕
          </button>
        )}
        <div className="dd-searchable__arrow">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="dd-searchable__dropdown" style={{ maxHeight }}>
          {filteredItems.length > 0 ? (
            <ul ref={listRef} className="dd-searchable__list">
              {flattenedItems.map((item, index) => renderItem(item, index))}
            </ul>
          ) : (
            <div className="dd-searchable__no-results">
              {noResultsText}
              {allowCustomValue && searchTerm && (
                <button
                  className="dd-searchable__custom-option"
                  onClick={() => {
                    onCustomValue?.(searchTerm);
                    setIsOpen(false);
                  }}
                >
                  Add "{searchTerm}"
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { DDSearchable };
export default DDSearchable;
