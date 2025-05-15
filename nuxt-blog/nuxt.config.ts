// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  
  app: {
    head: {
      htmlAttrs: {
        lang: 'it',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  css: [
    '@/assets/css/main.css',
  ],

  modules: [
    '@nuxtjs/prismic',
  ],

  prismic: {
    endpoint: 'joshuarte',
  },

  // Transpila i pacchetti necessari
  build: {
    transpile: ['@prismicio/client']
  },
  
  // Aggiungo la data di compatibilità per Nitro
  nitro: {
    compatibilityDate: '2025-05-15'
  }
}); 