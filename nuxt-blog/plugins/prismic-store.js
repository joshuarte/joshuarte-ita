// Plugin per precaricare i dati di Prismic all'avvio dell'app
import { usePrismicStore } from '~/stores/prismic';

export default defineNuxtPlugin(async (nuxtApp) => {
  // Inizializza lo store Pinia
  const prismicStore = usePrismicStore();
  
  // Avvia il precaricamento dei dati in parallelo
  // Usiamo Promise.allSettled per non bloccare l'app se qualche chiamata fallisce
  Promise.allSettled([
    prismicStore.fetchHomeData(),
    prismicStore.fetchProjects()
  ]).then(results => {
    console.log('Precaricamento dati Prismic completato');
  }).catch(error => {
    console.error('Errore nel precaricamento dati Prismic:', error);
  });
}); 