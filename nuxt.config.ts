export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY
  },
  nitro: {
    preset: 'cloudflare-pages',
    cloudflare: {
      compatibilityFlags: ['nodejs_compat']
    }
  },
  devtools: { enabled: true }
})
