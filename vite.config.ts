import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    basicSsl(),
    // Gzip for broad compatibility
    viteCompression({ algorithm: "gzip", ext: ".gz", threshold: 1024 }),
    // Brotli for modern browsers — smaller than gzip
    viteCompression({ algorithm: "brotliCompress", ext: ".br", threshold: 1024 }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "lucide-react": path.resolve(__dirname, "./src/icons8-proxy.tsx"),
    },
  },
  build: {
    // Target modern browsers to ship less polyfill code
    target: ["es2020", "chrome96", "firefox97", "safari15"],
    // Enable minification (esbuild is the default, which is fast)
    minify: "esbuild",
    // Inline small assets to reduce requests
    assetsInlineLimit: 4096,
    // Increase limit slightly so we don't get noise warnings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React runtime — must be first so nothing else bleeds in
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/react-router-dom/") || id.includes("node_modules/scheduler/")) {
            return "vendor";
          }
          // Supabase client — large and stable
          if (id.includes("node_modules/@supabase/")) {
            return "supabase";
          }
          // Charting library — only needed on analytics pages
          if (id.includes("node_modules/recharts")) {
            return "charts";
          }
          // Framer Motion — only needed for landing page animations
          if (id.includes("node_modules/framer-motion")) {
            return "animations";
          }
          // ReactFlow — only needed on flow builder
          if (id.includes("node_modules/reactflow") || id.includes("node_modules/@reactflow")) {
            return "flow";
          }
          // Radix UI primitives
          if (id.includes("node_modules/@radix-ui/")) {
            return "radix";
          }
          // Utility libs
          if (
            id.includes("node_modules/date-fns") ||
            id.includes("node_modules/zod") ||
            id.includes("node_modules/clsx") ||
            id.includes("node_modules/tailwind-merge") ||
            id.includes("node_modules/class-variance-authority")
          ) {
            return "utils";
          }
        },
      },
    },
  },
}));
