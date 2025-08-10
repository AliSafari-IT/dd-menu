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
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Menu theme |
| `variant` | `'default' \| 'navbar' \| 'minimal'` | `'default'` | Menu variant style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Menu size |
| `placement` | `'bottom' \| 'bottom-start' \| 'bottom-end' \| 'top' \| 'top-start' \| 'top-end' \| 'right' \| 'right-start' \| 'right-end' \| 'left' \| 'left-start' \| 'left-end'` | `'bottom'` | Menu placement |
| `closeOnClick` | `boolean` | `true` | Close menu when item is clicked |
| `trigger` | `ReactNode` | Default button | Custom trigger element |
| `className` | `string` | `''` | Additional CSS class names |
| `style` | `CSSProperties` | `{}` | Inline styles for the menu |

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

## Styling

The component includes default styling, but you can customize it by overriding CSS variables or using the provided class names:

```css
:root {
  --dd-menu-bg: #ffffff;
  --dd-menu-text: #333333;
  --dd-menu-hover-bg: #f5f5f5;
  --dd-menu-hover-text: #000000;
  --dd-menu-disabled-text: #999999;
  --dd-menu-border: #e0e0e0;
  --dd-menu-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --dd-menu-bg: #333333;
  --dd-menu-text: #f5f5f5;
  --dd-menu-hover-bg: #444444;
  --dd-menu-hover-text: #ffffff;
  --dd-menu-disabled-text: #777777;
  --dd-menu-border: #444444;
  --dd-menu-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
```

## Accessibility

The dropdown menu is built with accessibility in mind:

- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- ARIA attributes for screen readers
- Focus management for keyboard users
- Proper contrast ratios for text

## License

MIT © [Ali Safari](https://github.com/AliSafari-IT)
