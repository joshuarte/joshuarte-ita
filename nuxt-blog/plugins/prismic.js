import * as prismic from '@prismicio/client'

export default defineNuxtPlugin((nuxtApp) => {
  // Il modulo @nuxtjs/prismic già fornisce $prismic,
  // quindi creiamo un servizio con un nome diverso
  const client = prismic.createClient('joshuarte', {
    routes: [
      {
        type: 'page',
        path: '/:uid'
      },
      {
        type: 'blog_post',
        path: '/blog/:uid'
      }
    ]
  })
  
  // Usa un nome diverso per evitare conflitti
  return {
    provide: {
      prismicCustom: {
        client
      }
    }
  }
}) 