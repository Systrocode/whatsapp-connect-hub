import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("Main.tsx: SCRIPT START");

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("FATAL: Root element not found");
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

// Check Environment Variables immediately
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log("Env Check - URL:", supabaseUrl ? "Defined" : "MISSING");
console.log("Env Check - Key:", supabaseKey ? "Defined" : "MISSING");

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase configuration");
  root.render(
    <div style={{ padding: "20px", fontFamily: "sans-serif", color: "#333" }}>
      <h1 style={{ color: "red" }}>Configuration Error</h1>
      <p>The application cannot start because Supabase environment variables are missing.</p>
      <div style={{ background: "#f0f0f0", padding: "15px", borderRadius: "5px" }}>
        <strong>Missing Variables:</strong>
        <ul style={{ color: "#d32f2f" }}>
          {!supabaseUrl && <li>VITE_SUPABASE_URL</li>}
          {!supabaseKey && <li>VITE_SUPABASE_PUBLISHABLE_KEY</li>}
        </ul>
      </div>
      <p>Please create a <code>.env</code> file in the project root with these values.</p>
    </div>
  );
} else {
  // Only attempt to load App if config is present
  root.render(<div style={{ padding: 20 }}>Loading Application...</div>);

  import("./App.tsx")
    .then(({ default: App }) => {
      console.log("App loaded, rendering...");
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    })
    .catch((err) => {
      console.error("App Import Error:", err);
      root.render(
        <div style={{ padding: 20, color: 'red' }}>
          <h1>Runtime Error</h1>
          <pre>{err.message}</pre>
        </div>
      );
    });
}
