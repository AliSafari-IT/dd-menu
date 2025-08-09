import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import "../../dist/index.css";
import '@asafarim/shared/dist/styles.css';
import '@asafarim/react-themes/styles.css';
import { ThemeProvider } from "@asafarim/react-themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultMode="auto" persistMode={true}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);


