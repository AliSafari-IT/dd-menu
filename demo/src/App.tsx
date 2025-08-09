import React, { useMemo, useState } from "react";
import DDMenu, { type MenuItem, type DDMenuVariant, type DDMenuSize } from "@asafarim/dd-menu";
import { ThemeToggle } from "@asafarim/react-themes";

type Theme = "auto" | "light" | "dark";
type Placement = "bottom" | "bottom-start" | "bottom-end" | "top" | "top-start" | "top-end" | "right" | "left";

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
              { id: "shoes", label: "Shoes" }
            ]
          }
        ]
      },
      { id: "books", label: "Books", icon: "📚" }
    ]
  },
  { id: "about", label: "About Us", icon: "ℹ️" },
  { id: "help", label: "Help", icon: "❓", disabled: true }
];

const placements: Placement[] = [
  "bottom",
  "bottom-start",
  "bottom-end",
  "top",
  "top-start",
  "top-end",
  "right",
  "left"
];

export default function App() {
  const [theme, setTheme] = useState<Theme>("auto");
  const [size, setSize] = useState<DDMenuSize>("md");
  const [hoverDelay, setHoverDelay] = useState<number>(150);
  const [closeOnClick, setCloseOnClick] = useState<boolean>(true);

  const baseItems = useMemo(() => makeNestedItems(), []);
  const onItemClick = (item: MenuItem) => alert(`Clicked: ${item.label}`);

  const minimalTrigger = (
    <button className="pill">Action Menu</button>
  );

  const profileTrigger = (
    <div className="pill">
      <div className="avatar">JD</div>
      <span>John Doe</span>
    </div>
  );

  return (
    <div className="container">
      <div className="header">
        <div className="title">@asafarim/dd-menu – React + TS Demo</div>
        <div className="controls">
          <div className="control">
            <ThemeToggle 
            size={size === "xs" ? "sm" : size === "2xl" ? "lg" : size === "xl" ? "lg" : size } 
            key={theme}
            showLabels={true}
            className="dd-menu--theme-toggle"
            style={{ fontSize: size === "xs" ? "12px" : size === "sm" ? "14px" : size === "md" ? "16px" : size === "lg" ? "18px" : size === "xl" ? "20px" : "22px" }}
            />
          </div>
          <div className="control">
            <label className="note">Size</label>
            <select value={size} onChange={(e) => setSize(e.target.value as DDMenuSize)}>
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
            <input type="range" min={0} max={800} step={50} value={hoverDelay} onChange={(e) => setHoverDelay(Number(e.target.value))} />
          </div>
          <div className="control">
            <label className="note">Close on click</label>
            <input type="checkbox" checked={closeOnClick} onChange={(e) => setCloseOnClick(e.target.checked)} />
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Default</h3>
          <DDMenu
            items={baseItems}
            theme={theme}
            size={size}
            variant="default"
            onItemClick={onItemClick}
            closeOnClick={closeOnClick}
            hoverDelay={hoverDelay}
          />
        </div>

        <div className="card">
          <h3>Minimal (custom trigger)</h3>
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
        </div>

        <div className="card">
          <h3>Navbar (profile trigger)</h3>
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
        </div>

        <div className="card">
          <h3>Sidebar</h3>
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
        </div>

        <div className="card">
          <h3>Placements</h3>
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
        </div>

        <div className="card">
          <h3>Disabled + Active Items</h3>
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
                  { id: "invites", label: "Invites", disabled: true }
                ]
              }
            ]}
            theme={theme}
            size={size}
            onItemClick={onItemClick}
            closeOnClick={closeOnClick}
            hoverDelay={hoverDelay}
          />
        </div>

        <div className="card">
          <h3>Keep open on item click</h3>
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
          <div className="note">Useful for multi-select or menus with toggles.</div>
        </div>
      </div>
    </div>
  );
}


