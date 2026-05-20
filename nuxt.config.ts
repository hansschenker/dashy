export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY
  },
  devtools: { enabled: true }
})
