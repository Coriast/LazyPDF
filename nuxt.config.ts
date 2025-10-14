import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint"],

  // https://v2.tauri.app/start/frontend/nuxt/
  ssr: false,
  vite: {
    plugins: [tailwindcss()],
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      strictPort: true,
    },
  },
  ignore: ["**/src-tauri/**"],
});

// Documentação: https://nuxt.com/docs/api/configuration/nuxt-config
