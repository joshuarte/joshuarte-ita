import { defineStore } from 'pinia';

/**
 * Store generale per il sito
 * Gestisce le azioni globali dell'applicazione
 */
export const useMainStore = defineStore('main', {
  // Stato dello store
  state: () => ({
    // Stato del menu mobile
    isMobileMenuOpen: false,
    // Stato delle immagini lazy load
    lazyImagesLoaded: false,
    // Progetti visibili sulla pagina
    visibleProjects: 6,
    // Stato del pannello progetti (se è visibile o no)
    isPortfolioPanelVisible: false
  }),

  // Getters
  getters: {
    portfolioPanelClass: (state) => {
      // Se il pannello è visibile, restituisce la classe per mostrarlo
      // Se è nascosto, restituisce la classe per nasconderlo
      return state.isPortfolioPanelVisible ? 'slideOutRight' : '';
    }
  },

  // Actions (metodi per modificare lo stato)
  actions: {
    // Menu mobile
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    openMobileMenu() {
      this.isMobileMenuOpen = true;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    
    // Gestione pannello portfolio
    togglePortfolioPanel() {
      this.isPortfolioPanelVisible = !this.isPortfolioPanelVisible;
    },
    showPortfolioPanel() {
      this.isPortfolioPanelVisible = true;
    },
    hidePortfolioPanel() {
      this.isPortfolioPanelVisible = false;
    },
    
    // Gestione lazy loading immagini
    initLazyImages() {
      if (process.client && !this.lazyImagesLoaded) {
        // Utilizziamo Intersection Observer per caricare le immagini lazy
        const lazyImages = document.querySelectorAll('img.lazy-image');
        
        if ('IntersectionObserver' in window && lazyImages.length > 0) {
          const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.classList.add('loaded');
                  imageObserver.unobserve(img);
                }
              }
            });
          });
          
          lazyImages.forEach(img => {
            imageObserver.observe(img);
          });
          
          this.lazyImagesLoaded = true;
        }
      }
    },
    
    // Carica più progetti (paginazione)
    loadMoreProjects(increment = 6) {
      this.visibleProjects += increment;
      
      // Riattiva il lazy loading per le nuove immagini
      setTimeout(() => {
        this.initLazyImages();
      }, 100);
    }
  }
}); 