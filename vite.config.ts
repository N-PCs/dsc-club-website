import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  ssr: {
    // Keep browser-only packages out of SSR bundle — they reference window/WebGL at import time
    external: ["three", "gsap", "lenis", "simplex-noise", "canvas-confetti"],
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
