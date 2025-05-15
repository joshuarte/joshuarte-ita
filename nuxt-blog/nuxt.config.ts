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
    '@/assets/css/app.scss',
  ],

  modules: [
    '@nuxtjs/prismic',
    '@pinia/nuxt',
  ],

  // Configurazione per SASS - importiamo le variabili in tutti i componenti
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/variables.scss";'
        }
      }
    }
  },

  prismic: {
    endpoint: 'joshuarte',
    clientConfig: {
      routes: [
        {
          type: 'home',
          path: '/',
        },
        {
          type: 'project',
          path: '/projects/:uid',
        },
      ],
    },
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