<template>
  <div class="inner right-portfolio">
    <div class="content2">
      <ProjectCard 
        v-for="(project, index) in projects" 
        :key="project.uid" 
        :project="project" 
        :index="index" 
      />
    </div>
    <div class="clearfix d-none d-sm-block">&nbsp;</div>
    <nav class="btn-transition d-none d-sm-block">
      <div class="content">
        <a 
          href="#" 
          id="show-bio-desktop" 
          data-hover="TORNA ALLA BIOGRAFIA"
          @click.prevent="hidePortfolioPanel"
        >
          <span>TORNA ALLA BIOGRAFIA</span>
        </a>
      </div>
    </nav>
    <nav class="btn-transition d-block d-sm-none">
      <div class="content">
        <a 
          href="#"
          id="show-bio-mobile"
          data-hover="TORNA ALLA BIOGRAFIA"
          data-module="scrollTop"
        >
          <span>TORNA ALLA BIOGRAFIA</span>
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useMainStore } from '~/stores';
import { storeToRefs } from 'pinia';
import { onMounted, watchEffect } from 'vue';
import ProjectCard from '~/components/ProjectCard.vue';

const mainStore = useMainStore();
const { isPortfolioPanelVisible } = storeToRefs(mainStore);
const { hidePortfolioPanel } = mainStore;

// Props per i progetti da mostrare
const props = defineProps({
  projects: {
    type: Array,
    default: () => []
  }
});

// Funzione per costruire il percorso dell'immagine con il formato corretto
const getImagePath = (url, format) => {
  if (!url) return '';
  
  // Se l'URL è già in formato Prismic, gestisci secondo la struttura di Prismic
  if (typeof url === 'object' && url.url) {
    return url.url.replace(/\.[^.]+$/, `.${format}`);
  }
  
  // Altrimenti gestisci il percorso normale
  return url.replace(/\.[^.]+$/, `.${format}`);
};

// Estrai la descrizione del progetto
const getDescription = (project) => {
  if (!project) return '';
  
  // Gestisci sia testo semplice che Rich Text di Prismic
  if (project.jobDescription) {
    if (Array.isArray(project.jobDescription)) {
      // Rich Text di Prismic
      const textBlock = project.jobDescription.find(block => 
        block.type === 'paragraph' && block.text
      );
      return textBlock ? textBlock.text : '';
    }
    return project.jobDescription;
  }
  
  return '';
};

// Attiva il lazy loading quando il componente è montato
onMounted(() => {
  if (process.client) {
    setTimeout(() => {
      const lazyImages = document.querySelectorAll('.lazy-image');
      
      if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
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
      }
    }, 100);
  }
});
</script>

<style lang="scss" scoped>
/* Stili per il pannello del portfolio */


/* Stili per il lazy loading */
.lazy-image {
  opacity: 0;
  transition: opacity 0.3s;
  
  &.loaded {
    opacity: 1;
  }
}
</style> 