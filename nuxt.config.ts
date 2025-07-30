// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  css: [
    'vuetify/styles', 
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/css/main.css'
  ],
  modules: ['@pinia/nuxt'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    define: {
      'process.env.DEBUG': false,
    },
  },
})
