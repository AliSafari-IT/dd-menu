import React, { useMemo, useState } from "react";
import DDMenu, {
  type MenuItem,
  type DDMenuVariant,
  type DDMenuSize,
} from "@asafarim/dd-menu";
import { ThemeToggle } from "@asafarim/react-themes";
import { PackageLinks } from "@asafarim/shared";
type Theme = "auto" | "light" | "dark";
type Placement =
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "left";

const makeNestedItems = (): MenuItem[] => [
  { id: "home", label: "Home", icon: "🏠" },
  {
    id: "products",
    label: "Products",
    icon: "📦",
    children: [
      { id: "electronics", label: "Electronics", icon: "🔌" },
      {
        id: "clothing",
        label: "Clothing",
        icon: "👕",
        children: [
          { id: "men", label: "Men" },
          { id: "women", label: "Women" },
          {
            id: "kids",
            label: "Kids",
            children: [
              { id: "toys", label: "Toys" },
              { id: "shoes", label: "Shoes" },
            ],
          },
        ],
      },
      { id: "books", label: "Books", icon: "📚" },
    ],
  },
  { id: "about", label: "About Us", icon: "ℹ️" },
  { id: "help", label: "Help", icon: "❓", disabled: true },
];

const placements: Placement[] = [
  "bottom",
  "bottom-start",
  "bottom-end",
  "top",
  "top-start",
  "top-end",
  "right",
  "left",
];

export default function App() {
  const [theme, setTheme] = useState<Theme>("auto");
  const [size, setSize] = useState<DDMenuSize>("md");
  const [hoverDelay, setHoverDelay] = useState<number>(150);
  const [closeOnClick, setCloseOnClick] = useState<boolean>(true);

  const baseItems = useMemo(() => makeNestedItems(), []);
  const onItemClick = (item: MenuItem) => alert(`Clicked: ${item.label}`);

  const minimalTrigger = <button className="pill">Action Menu</button>;

  const profileTrigger = (
    <div className="pill">
      <div className="avatar">JD</div>
      <span>John Doe</span>
    </div>
  );

  return (
    <div className="container">
      <div className="intro-section">
        <h1 className="main-title">@asafarim/dd-menu</h1>
        <p className="subtitle">
          A minimal, elegant, and highly customizable dropdown menu React
          component
        </p>
        <PackageLinks
          packageName={"@asafarim/dd-menu"}
          githubPath={"https://github.com/AliSafari-IT/dd-menu"}
          demoPath="https://alisafari-it.github.io/dd-menu/"
        />
        <div className="features">
          <div className="feature">
            <span className="feature-icon">🎨</span>
            <span>Beautiful theming with dark/light modes</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📱</span>
            <span>Fully responsive and accessible</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔧</span>
            <span>TypeScript support with full type safety</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <span>Lightweight with smooth animations</span>
          </div>
        </div>
        <div className="quick-install">
          <h3>Quick Installation</h3>
          <div className="install-commands">
            <code>npm install @asafarim/dd-menu</code>
            <span className="or">or</span>
            <code>yarn add @asafarim/dd-menu</code>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="title">Interactive Demo & Tutorial</div>
        <div className="controls">
          <div className="control">
            <ThemeToggle
              size={
                size === "xs"
                  ? "sm"
                  : size === "2xl"
                  ? "lg"
                  : size === "xl"
                  ? "lg"
                  : size
              }
              key={theme}
              showLabels={true}
              className="dd-menu--theme-toggle"
              style={{
                fontSize:
                  size === "xs"
                    ? "12px"
                    : size === "sm"
                    ? "14px"
                    : size === "md"
                    ? "16px"
                    : size === "lg"
                    ? "18px"
                    : size === "xl"
                    ? "20px"
                    : "22px",
              }}
            />
          </div>
          <div className="control">
            <label className="note">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as DDMenuSize)}
            >
              <option value="xs">xs</option>
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
              <option value="xl">xl</option>
              <option value="2xl">2xl</option>
            </select>
          </div>
          <div className="control">
            <label className="note">Hover delay: {hoverDelay}ms</label>
            <input
              type="range"
              min={0}
              max={800}
              step={50}
              value={hoverDelay}
              onChange={(e) => setHoverDelay(Number(e.target.value))}
            />
          </div>
          <div className="control">
            <label className="note">Close on click</label>
            <input
              type="checkbox"
              checked={closeOnClick}
              onChange={(e) => setCloseOnClick(e.target.checked)}
            />
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h3>1. Default Variant</h3>
          <p className="note">
            The most basic dropdown menu with a simple "Menu" button trigger.
            Perfect for general-purpose dropdowns.
          </p>
          <DDMenu
            items={baseItems}
            theme={theme}
            size={size}
            variant="default"
            onItemClick={onItemClick}
            closeOnClick={closeOnClick}
            hoverDelay={hoverDelay}
          />
          <div className="spacer" />
          <details className="code-sample">
            <summary>📝 Usage Code</summary>
            <pre>
              <code>{`import DDMenu from "@asafarim/dd-menu";

const items = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "about", label: "About", icon: "ℹ️" }
];

<DDMenu
  items={items}
  variant="default"
  onItemClick={(item) => console.log(item)}
/>`}</code>
            </pre>
          </details>
        </div>

        <div className="card">
          <h3>2. Minimal Variant (Custom Trigger)</h3>
          <p className="note">
            Use your own custom trigger element. Great for action buttons,
            context menus, or when you need full control over the trigger
            appearance.
          </p>
          <DDMenu
            items={baseItems}
            theme={theme}
            size={size}
            variant="minimal"
            className="dd-menu--minimal"
            trigger={minimalTrigger}
            onItemClick={onItemClick}
            closeOnClick={closeOnClick}
            hoverDelay={hoverDelay}
          />
          <div className="spacer" />
          <details className="code-sample">
            <summary>📝 Usage Code</summary>
            <pre>
              <code>{`const customTrigger = (
  <button className="my-button">
    Action Menu
  </button>
);

<DDMenu
  items={items}
  variant="minimal"
  trigger={customTrigger}
  onItemClick={(item) => console.log(item)}
/>`}</code>
            </pre>
          </details>
        </div>

        <div className="card">
          <h3>3. Navbar Variant (Profile Menu)</h3>
          <p className="note">
            Designed for navigation bars and headers. Typically used for user
            profile menus, account settings, or top-level navigation.
          </p>
          <div className="nav">
            <DDMenu
              items={baseItems}
              theme={theme}
              size={size}
              variant="navbar"
              className="dd-menu--navbar"
              trigger={profileTrigger}
              placement="bottom-end"
              onItemClick={onItemClick}
              closeOnClick={closeOnClick}
              hoverDelay={hoverDelay}
            />
          </div>
          <div className="spacer" />
          <details className="code-sample">
            <summary>📝 Usage Code</summary>
            <pre>
              <code>{`const profileTrigger = (
  <div className="profile-trigger">
    <div className="avatar">JD</div>
    <span>John Doe</span>
  </div>
);

<DDMenu
  items={profileItems}
  variant="navbar"
  trigger={profileTrigger}
  placement="bottom-end"
  onItemClick={handleProfileAction}
/>`}</code>
            </pre>
          </details>
        </div>

        <div className="card">
          <h3>4. Sidebar Variant (Collapsible Navigation)</h3>
          <p className="note">
            Perfect for vertical navigation menus. Supports nested items that
            expand/collapse on click. Ideal for admin panels and dashboards.
          </p>
          <div className="sidebar">
            <div className="sidebar-panel">
              <DDMenu
                items={baseItems}
                theme={theme}
                size={size}
                variant="sidebar"
                placement="right"
                onItemClick={onItemClick}
                closeOnClick={closeOnClick}
                hoverDelay={hoverDelay}
              />
            </div>
            <div className="sidebar-panel">
              <div className="note">Content area</div>
            </div>
          </div>
          <div className="spacer" />
          <details className="code-sample">
            <summary>📝 Usage Code</summary>
            <pre>
              <code>{`const sidebarItems = [
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
/>`}</code>
            </pre>
          </details>
        </div>

        <div className="card">
          <h3>5. Placement Options</h3>
          <p className="note">
            Control where the dropdown appears relative to the trigger. Choose
            from 8 different positions to fit your layout needs.
          </p>
          <div className="row">
            {placements.map((p) => (
              <DDMenu
                key={p}
                items={baseItems}
                theme={theme}
                size={size}
                placement={p as Placement}
                trigger={<button className="pill">{p}</button>}
                onItemClick={onItemClick}
                closeOnClick={closeOnClick}
                hoverDelay={hoverDelay}
              />
            ))}
          </div>
          <div className="spacer" />
          <details className="code-sample">
            <summary>📝 Usage Code</summary>
            <pre>
              <code>{`// Available placements:
// "bottom" | "bottom-start" | "bottom-end"
// "top" | "top-start" | "top-end"
// "right" | "left"

<DDMenu
  items={items}
  placement="bottom-end"  // Dropdown appears at bottom-right
  trigger={<button>Options</button>}
/>

<DDMenu
  items={items}
  placement="top-start"    // Dropdown appears at top-left
  trigger={<button>More</button>}
/>`}</code>
            </pre>
          </details>
        </div>

        <div className="card">
          <h3>6. Item States (Active & Disabled)</h3>
          <p className="note">
            Show current selection with active states and prevent interaction
            with disabled items. Perfect for navigation menus and conditional
            actions.
          </p>
          <DDMenu
            items={[
              { id: "dashboard", label: "Dashboard", icon: "📊", active: true },
              { id: "settings", label: "Settings", icon: "⚙️" },
              { id: "billing", label: "Billing", icon: "💳", disabled: true },
              {
                id: "team",
                label: "Team",
                icon: "👥",
                children: [
                  { id: "members", label: "Members" },
                  { id: "invites", label: "Invites", disabled: true },
                ],
              },
            ]}
            theme={theme}
            size={size}
            onItemClick={onItemClick}
            closeOnClick={closeOnClick}
            hoverDelay={hoverDelay}
          />
          <div className="spacer" />
          <details className="code-sample">
            <summary>📝 Usage Code</summary>
            <pre>
              <code>{`const menuItems = [
  {
    id: "current",
    label: "Current Page",
    icon: "📍",
    active: true        // Highlights as current/selected
  },
  {
    id: "restricted",
    label: "Premium Feature",
    icon: "🔒",
    disabled: true      // Grayed out, not clickable
  },
  {
    id: "normal",
    label: "Available Option",
    icon: "✅"
  }
];

<DDMenu items={menuItems} />`}</code>
            </pre>
          </details>
        </div>

        <div className="card">
          <h3>7. Persistent Menu (closeOnClick = false)</h3>
          <p className="note">
            Keep the menu open after clicking items. Perfect for multi-select
            scenarios, filter menus, or menus with checkboxes and toggles.
          </p>
          <DDMenu
            items={baseItems}
            theme={theme}
            size={size}
            closeOnClick={false}
            trigger={<button className="pill">closeOnClick = false</button>}
            onItemClick={onItemClick}
            hoverDelay={hoverDelay}
          />
          <div className="spacer" />
          <details className="code-sample">
            <summary>📝 Usage Code</summary>
            <pre>
              <code>{`const [selectedFilters, setSelectedFilters] = useState([]);

const filterItems = [
  { id: "category1", label: "Electronics" },
  { id: "category2", label: "Clothing" },
  { id: "category3", label: "Books" }
];

const handleFilterClick = (item) => {
  setSelectedFilters(prev => 
    prev.includes(item.id)
      ? prev.filter(id => id !== item.id)
      : [...prev, item.id]
  );
};

<DDMenu
  items={filterItems}
  closeOnClick={false}    // Menu stays open
  onItemClick={handleFilterClick}
  trigger={<button>Filters</button>}
/>`}</code>
            </pre>
          </details>
        </div>

        <div className="card">
          <h3>8. Advanced: Event Handlers</h3>
          <p className="note">
            Listen to hover and font size changes with custom event handlers.
            Perfect for analytics, tooltips, or dynamic UI updates.
          </p>
          <DDMenu
            items={baseItems}
            theme={theme}
            size={size}
            onItemClick={onItemClick}
            onHoverChange={(isHovering) => {
              console.log("Menu hover state:", isHovering);
            }}
            onFontSizeChange={(fontSize) => {
              console.log("Font size changed to:", fontSize);
            }}
            closeOnClick={closeOnClick}
            hoverDelay={hoverDelay}
          />
          <div className="spacer" />
          <details className="code-sample">
            <summary>📝 Usage Code</summary>
            <pre>
              <code>{`<DDMenu
  items={items}
  onItemClick={(item) => {
    console.log('Item clicked:', item);
    // Handle navigation, state updates, etc.
  }}
  onHoverChange={(isHovering) => {
    console.log('Menu hover state:', isHovering);
    // Show/hide tooltips, track engagement, etc.
  }}
  onFontSizeChange={(fontSize) => {
    console.log('Font size changed to:', fontSize);
    // Update related UI elements, save preferences, etc.
  }}
/>`}</code>
            </pre>
          </details>
        </div>

        <div className="card">
          <h3>9. Advanced: Custom Styling</h3>
          <p className="note">
            Apply custom CSS classes and inline styles for complete visual
            control. Combine with theme variables for consistent styling.
          </p>
          <DDMenu
            items={baseItems}
            theme={theme}
            size={size}
            className="my-custom-menu"
            style={
              {
                "--dd-accent": "#ff6b6b",
                "--dd-radius-md": "12px",
              } as React.CSSProperties
            }
            onItemClick={onItemClick}
            closeOnClick={closeOnClick}
            hoverDelay={hoverDelay}
          />
          <div className="spacer" />
          <details className="code-sample">
            <summary>📝 Usage Code</summary>
            <pre>
              <code>{`// Custom CSS class
.my-custom-menu {
  --dd-accent: #ff6b6b;
  --dd-radius-md: 12px;
  border: 2px solid var(--dd-accent);
}

// Apply custom styling
<DDMenu
  items={items}
  className="my-custom-menu"
  style={{
    '--dd-accent': '#ff6b6b',
    '--dd-radius-md': '12px'
  } as React.CSSProperties}
/>`}</code>
            </pre>
          </details>
        </div>

        <div className="card full-width">
          <h3>🚀 Getting Started</h3>
          <div className="getting-started">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Install the package</h4>
                <code>npm install @asafarim/dd-menu</code>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Import the component and styles</h4>
                <pre>
                  <code>{`import DDMenu from '@asafarim/dd-menu';
import '@asafarim/dd-menu/dist/index.css';`}</code>
                </pre>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Define your menu items</h4>
                <pre>
                  <code>{`const items = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'about', label: 'About', icon: 'ℹ️' }
];`}</code>
                </pre>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Use the component</h4>
                <pre>
                  <code>{`<DDMenu
  items={items}
  onItemClick={(item) => console.log(item)}
/>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
