/**
 * @asafarim/dd-menu
 * 
 * A minimal, elegant, and highly customizable dropdown menu React component. Perfect for navbar, sidebar, or any dropdown needs with beautiful theming and smooth animations.
 * 
 * @author Ali Safari <asafarim@gmail.com>
 * @version 1.3.0
 */

export { DDMenu, default as DDMenuDefault } from "./components/DDMenu";
export * from "./types/menu.types";
export { DDMenu as default } from "./components/DDMenu";

// Re-export types for easier consumption
export type { 
  DDMenuVariant, 
  DDMenuSize, 
} from "./components/DDMenu"; 
