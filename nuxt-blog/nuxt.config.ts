// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/prismic'],
  prismic: {
    endpoint: 'joshuarte',
    preview: false
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      title: 'JOSHUARTE | Frontend Developer & UI/UX Designer',
      meta: [
        { name: 'description', content: 'Senior Frontend Developer & UI/UX Designer specializzato in JavaScript, React, Vue.js, Web Performance e Accessibilità. Portfolio di progetti web e game development.' },
        { name: 'author', content: 'Luca Joshua Mosca' },
        { property: 'og:title', content: 'Joshuarte | Frontend Developer & UI/UX Designer | Portfolio' },
        { property: 'og:description', content: 'Portfolio di Luca Joshua Mosca, Senior Frontend Developer & UI/UX Designer con 15 anni di esperienza in web development, responsive design, JavaScript e game development.' },
        { property: 'og:url', content: 'https://www.joshuarte.it' },
        { property: 'og:image', content: 'https://www.joshuarte.it/images/bg.jpg' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Joshuarte | Frontend Developer & UI/UX Designer | Portfolio' },
        { name: 'twitter:description', content: 'Portfolio di Luca Joshua Mosca, Senior Frontend Developer & UI/UX Designer con 15 anni di esperienza in web development, responsive design, JavaScript e game development.' },
        { name: 'twitter:image', content: 'https://www.joshuarte.it/images/bg.jpg' }
      ],
      link: [
        { rel: 'canonical', href: 'https://www.joshuarte.it' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-touch-icon.png' }
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=UA-118732914-2',
          async: true
        }
      ]
    }
  },
  css: [
    '~/assets/css/main.css'
  ],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/moscanellammerda',
        '/blog'
      ]
    }
  },
  compatibilityDate: '2025-05-15'
}) 