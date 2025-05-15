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

  // Prismic configuration
  prismic: {
    endpoint: 'joshuarte',
    clientConfig: {
      // Add access token if you have a private repository
      // accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      routes: [
        {
          type: 'home',
          path: '/',
        },
        {
          type: 'projects',
          path: '/progetti/:uid',
        },
        {
          type: 'articles',
          path: '/blog/:uid',
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