import { useMainStore } from '~/stores';

export default defineNuxtPlugin({
  name: 'lazy-images',
  setup() {
    const mainStore = useMainStore();
    
    // Inizializza il lazy loading delle immagini quando la pagina è completamente caricata
    if (process.client) {
      window.addEventListener('load', () => {
        mainStore.initLazyImages();
      });
      
      // Riattiva il lazy loading anche dopo la navigazione tra le pagine
      const nuxtApp = useNuxtApp();
      nuxtApp.hook('page:finish', () => {
        setTimeout(() => {
          mainStore.initLazyImages();
        }, 100);
      });
    }
  }
}); 