import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        short_name: "App",
        name: "TrilhaUTFPR-DV",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,webp,jpeg}"],
        globDirectory: "dist",
        additionalManifestEntries: [
          { url: "/", revision: null },
          { url: "/index.html", revision: null },
          { url: "/assets/imgDiv1TelaInicial.webp", revision: null },
          { url: "/assets/imgDiv2TelaInicial.jpg", revision: null },
          { url: "/assets/imgDiv3TelaInicial.jpg", revision: null },
          { url: "/assets/imgLogin.png", revision: null },
          { url: "/assets/BeijaFlor.jpeg", revision: null },
          { url: "/assets/Tucano.jpeg", revision: null },
        ],
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "document" ||
              request.destination === "script" ||
              request.destination === "style",
            handler: "CacheFirst",
            options: {
              cacheName: "vite-app-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
