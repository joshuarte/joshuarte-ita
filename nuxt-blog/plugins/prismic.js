import * as prismic from '@prismicio/client';

export default defineNuxtPlugin((nuxtApp) => {
  try {
    // Crea l'endpoint del repository Prismic
    const endpoint = prismic.getRepositoryEndpoint('joshuarte');
    
    // Configura il client Prismic
    const config = {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN || ''
    };
    
    // Crea il client Prismic
    const prismicClient = prismic.createClient(endpoint, config);
    
    // Espone il client come prismicCustom
    return {
      provide: {
        prismicCustom: prismicClient
      }
    }
  } catch (e) {
    console.error('Errore durante inizializzazione del client Prismic:', e);
    return {
      provide: {
        prismicCustom: null
      }
    }
  }
}) 