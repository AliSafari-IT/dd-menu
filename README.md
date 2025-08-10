# @asafarim/dd-menu

[![npm version](https://img.shields.io/npm/v/@asafarim/dd-menu.svg)](https://www.npmjs.com/package/@asafarim/dd-menu)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful, customizable dropdown menu and searchable dropdown component library for React with TypeScript. Features recursive nesting, multiple themes, custom triggers, keyboard navigation, and accessibility support. See a live demo at [alisafari-it.github.io](https://alisafari-it.github.io/dd-menu/) for different use cases.

![DD Menu Showcase](/public/dd-down.png)

## Components

### DDMenu - Dropdown Menu

A flexible dropdown menu component with support for nested items, custom triggers, and multiple variants.

### DDSearchable - Searchable Dropdown

A powerful searchable dropdown component with filtering, keyboard navigation, and customizable search behavior.

## Features

- 🔄 **Recursive Nesting**: Create unlimited nested dropdown menus
- 🔍 **Searchable Dropdown**: Filter items with real-time search and keyboard navigation
- 🎨 **Multiple Variants**: Choose from default, minimal, outlined, filled, navbar, and sidebar styles
- 🌓 **Theme Support**: Built-in light, dark, and auto themes
- 📱 **Responsive**: Works perfectly on all device sizes
- ♿ **Accessible**: Full keyboard navigation and ARIA support
- 🔧 **Highly Customizable**: Custom triggers, icons, styling, and search configuration
- ⚡ **Performance**: Debounced search, virtual scrolling support, and optimized rendering
- 🧩 **Zero Dependencies**: Pure React and CSS implementation

## Installation

```bash
# Using npm
npm install @asafarim/dd-menu

# Using yarn
yarn add @asafarim/dd-menu

# Using pnpm
pnpm add @asafarim/dd-menu
```

## Quick Start

```tsx
import DDMenu, { DDSearchable, MenuItem } from "@asafarim/dd-menu";

const App = () => {
  const menuItems: MenuItem[] = [
    { id: "home", label: "Home", link: "/", icon: "🏠" },
    {
      id: "products",
      label: "Products",
      icon: "📦",
      children: [
        { id: "electronics", label: "Electronics", link: "/products/electronics" },
        { id: "clothing", label: "Clothing", link: "/products/clothing" },
      ],
    },
    { id: "about", label: "About Us", link: "/about", icon: "ℹ️" },
  ];

  return (
    <div>
      {/* Dropdown Menu */}
      <DDMenu 
        items={menuItems} 
        theme="auto" 
        variant="default" 
        size="md" 
        placement="bottom-start"
        closeOnClick={true}
        onItemClick={(item) => console.log('Clicked:', item)}
      />

      {/* Searchable Dropdown */}
      <DDSearchable
        items={menuItems}
        placeholder="Search items..."
        onItemSelect={(item) => console.log('Selected:', item)}
        theme="auto"
        size="md"
      />
    </div>
  );
};
```

## Theming

Both `DDMenu` and `DDSearchable` support `theme="light" | "dark" | "auto"`.

- **Root theme class**: the root element receives `dd-menu--{theme}` / `dd-searchable--{theme}`.
- **Auto mode**: respects OS preference via `prefers-color-scheme`. If your app sets a theme
  attribute on a parent (e.g. `<html data-theme="light">`), it overrides auto so the app choice wins.
- **CSS variables**: colors are driven by CSS custom properties like `--dd-bg`, `--dd-text`, `--dd-border`, etc.

If you have a global theme toggle, set `data-theme="light"` or `data-theme="dark"` on `html` or `body` so all
menus follow your app’s theme while using `theme="auto"`.

## DDMenu Usage

### Basic Dropdown Menu

```tsx
<DDMenu
  items={menuItems}
  variant="default"
  onItemClick={(item) => console.log(item)}
/>
```

### Custom Trigger

```tsx
const customTrigger = (
  <button className="my-button">
    Action Menu
  </button>
);

<DDMenu
  items={menuItems}
  variant="minimal"
  trigger={customTrigger}
  onItemClick={(item) => console.log(item)}
/>
```

### Navbar Profile Menu

```tsx
const profileTrigger = (
  <div className="profile-trigger">
    <div className="avatar">JD</div>
    <span>John Doe</span>
  </div>
);

<DDMenu
  items={profileMenuItems}
  variant="navbar"
  trigger={profileTrigger}
  placement="bottom-end"
  onItemClick={handleProfileAction}
/>
```

### Sidebar Navigation

```tsx
const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  {
    id: "products",
    label: "Products",
    icon: "📦",
    children: [
      { id: "list", label: "Product List" },
      { id: "add", label: "Add Product" }
    ]
  }
];

<DDMenu
  items={sidebarItems}
  variant="sidebar"
  onItemClick={handleNavigation}
/>
```

## DDSearchable Usage

### Basic Searchable Dropdown

```tsx
<DDSearchable
  items={menuItems}
  placeholder="Search items..."
  onItemSelect={(item) => console.log('Selected:', item)}
/>
```

### Different Variants

```tsx
<DDSearchable variant="default" items={items} />
<DDSearchable variant="minimal" items={items} />
<DDSearchable variant="outlined" items={items} />
<DDSearchable variant="filled" items={items} />
```

### Advanced Search Configuration

```tsx
<DDSearchable
  items={items}
  caseSensitive={true}
  minSearchLength={2}
  debounceMs={500}
  searchKeys={["label", "id"]}
  onSearchChange={(term) => console.log("Search:", term)}
/>
```

### Allow Custom Values

```tsx
<DDSearchable
  items={items}
  allowCustomValue={true}
  onCustomValue={(value) => {
    // Handle custom value
    console.log('Custom value:', value);
    // You could add it to your items list
  }}
  placeholder="Type anything..."
/>
```

### Controlled Component

```tsx
const [selectedItem, setSelectedItem] = useState(null);

<DDSearchable
  items={items}
  selectedItem={selectedItem}
  onItemSelect={setSelectedItem}
  clearable={true}
/>
```

## Showcase Examples

### Navigation Menu

![Navbar Dropdown](/public/dd-navbar-item.png)

```tsx
<DDMenu
  items={navMenuItems}
  className="dd-menu--navbar"
  placement="bottom"
  closeOnClick={true}
  size="lg"
  theme="auto"
  trigger={
    <div className="dd-menu__trigger dd-menu__trigger--text">
      Navigation
    </div>
  }
/>
```

### User Profile Menu

![User Profile Dropdown](/public/user-profile-showcase.png)

```tsx
<DDMenu
  items={profileMenuItems}
  className="dd-menu--navbar"
  trigger={
    <div className="user-profile-trigger">
      <div className="avatar">JD</div>
      <span>John Doe</span>
    </div>
  }
  placement="bottom-end"
/>
```

### Custom Button Trigger

```tsx
<DDMenu 
  items={navMenuItems} 
  className="dd-menu--minimal"
  trigger={
    <button className="action-button">
      Action Menu
    </button>
  }
/>
```

## API Reference

### DDMenu Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `MenuItem[]` | Required | Array of menu items |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Theme for this menu |
| `variant` | `'default' \| 'minimal' \| 'navbar' \| 'sidebar'` | `'default'` | Visual variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Font sizing preset |
| `placement` | `'bottom' \| 'bottom-start' \| 'bottom-end' \| 'top' \| 'top-start' \| 'top-end' \| 'right' \| 'left'` | `'bottom-start'` | Dropdown placement |
| `closeOnClick` | `boolean` | `true` | Close menu when an item is clicked |
| `hoverDelay` | `number` | `150` | Delay (ms) for opening submenus on hover |
| `trigger` | `ReactNode` | Default button | Custom trigger element |
| `onItemClick` | `(item: MenuItem) => void` | `undefined` | Item click callback |
| `onHoverChange` | `(isHovering: boolean) => void` | `undefined` | Hover state callback |
| `onFontSizeChange` | `(size: DDMenuSize) => void` | `undefined` | Emits internal font size |
| `className` | `string` | `''` | Additional CSS class names |
| `style` | `CSSProperties` | `{}` | Inline styles |

### MenuItem Type

```ts
type MenuItem = {
  id: string;
  label: string;
  link?: string;
  icon?: string | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  children?: MenuItem[];
};
```

### DDSearchable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `MenuItem[]` | Required | Items to search (supports nesting) |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Component theme |
| `variant` | `'default' \| 'minimal' \| 'outlined' \| 'filled'` | `'default'` | Visual variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Font sizing preset |
| `placeholder` | `string` | `'Search...'` | Input placeholder |
| `onItemSelect` | `(item: MenuItem) => void` | `undefined` | Fired when an item is selected |
| `onSearchChange` | `(term: string) => void` | `undefined` | Fired on input changes (debounced) |
| `disabled` | `boolean` | `false` | Disable the control |
| `clearable` | `boolean` | `true` | Show a clear button |
| `maxHeight` | `number` | `300` | Max dropdown height (px) |
| `noResultsText` | `string` | `'No results found'` | Empty state label |
| `searchKeys` | `(keyof MenuItem)[]` | `['label','id']` | Fields used for matching |
| `caseSensitive` | `boolean` | `false` | Case sensitivity for matching |
| `minSearchLength` | `number` | `0` | Minimum length to start filtering |
| `debounceMs` | `number` | `300` | Debounce time for input changes |
| `selectedItem` | `MenuItem \| null` | `null` | Controlled selected item |
| `allowCustomValue` | `boolean` | `false` | Allow arbitrary values |
| `onCustomValue` | `(value: string) => void` | `undefined` | Called when a custom value is chosen |

## Styling

The components expose CSS variables you can override at any scope:

```css
:root {
  --dd-bg: #ffffff;
  --dd-text: #111827;
  --dd-border: #e5e7eb;
  --dd-bg-hover: #f9fafb;
  --dd-bg-active: #f3f4f6;
  --dd-accent: #3b82f6;
}

[data-theme="dark"] {
  --dd-bg: #18181b;
  --dd-text: #ffffff;
  --dd-border: #3f3f46;
  --dd-bg-hover: #27272a;
  --dd-bg-active: #3f3f46;
  --dd-accent: #60a5fa;
}
```

## Accessibility

The dropdown menu is built with accessibility in mind:

- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- ARIA attributes for screen readers
- Focus management for keyboard users
- Proper contrast ratios for text

## License

MIT © [Ali Safari](https://github.com/alisafari-it/dd-menu)
