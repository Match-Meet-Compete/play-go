import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icons/icon-192.png", "icons/icon-512.png", "apple-touch-icon.png"],
      manifest: {
        name: "PLAY",
        short_name: "PLAY",
        description: "Find people to play sports with in your city.",
        theme_color: "#0B0F14",
        background_color: "#0B0F14",
        display: "standalone",
        scope: "/",
        start_url: "/go",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
        ]
      },
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,svg,png,ico,txt,woff2}"]
      }
    })
  ],
  server: { port: 5173 }
});
