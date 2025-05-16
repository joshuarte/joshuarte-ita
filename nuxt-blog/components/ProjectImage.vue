<template>
  <picture v-if="hasImage">
    <!-- Supporto per formati di immagine moderni -->
    <source v-if="avifSrc" :srcset="avifSrc" type="image/avif">
    <source v-if="webpSrc" :srcset="webpSrc" type="image/webp">
    
    <!-- Immagine da caricare immediatamente per i primi 3 progetti -->
    <img
      v-if="isImportantProject"
      :src="imageSrc"
      class="img-responsive"
      :alt="alt"
      width="658"
      height="284"
      @error="handleImageError"
    />
    
    <!-- Lazy loading per progetti successivi -->
    <img
      v-else
      :data-src="imageSrc"
      :src="placeholderImage"
      class="img-responsive lazy-image"
      :alt="alt"
      loading="lazy"
      width="658"
      height="284"
      @error="handleImageError"
    />
  </picture>
</template>

<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  },
  alt: {
    type: String,
    default: ''
  }
});

// Placeholder per immagini lazy
const placeholderImage = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201%201%22%3E%3C%2Fsvg%3E";

// Verifica se il progetto è tra i primi 3 (caricamento immediato)
const isImportantProject = computed(() => {
  return props.index < 3;
});

// Verifica se c'è un'immagine da mostrare
const hasImage = computed(() => {
  return !!(props.project.imageUrl || (props.project.image && props.project.image.url));
});

// Percorso dell'immagine principale
const imageSrc = computed(() => {
  // Priorità all'immagine da Prismic se presente
  if (props.project.image && props.project.image.url) {
    return props.project.image.url;
  }
  
  // Altrimenti usa imageUrl se presente
  if (props.project.imageUrl) {
    // Se è un URL completo, usalo direttamente
    if (props.project.imageUrl.startsWith('http')) {
      return props.project.imageUrl;
    }
    // Altrimenti aggiungi il percorso completo
    return `/images/projects/${props.project.imageUrl}`;
  }
  
  // Fallback all'immagine placeholder
  return '/images/projects/placeholder-project.jpg';
});

// Percorso per l'immagine AVIF
const avifSrc = computed(() => {
  if (!hasImage.value) return '';
  
  // Se è un URL Prismic
  if (props.project.image && props.project.image.url) {
    return props.project.image.url.replace(/\.[^.]+$/, '.avif');
  }
  
  // Altrimenti genera path per immagine locale
  if (props.project.imageUrl) {
    const baseName = props.project.imageUrl.replace(/\.[^.]+$/, '');
    return `/images/projects/${baseName}.avif`;
  }
  
  return '';
});

// Percorso per l'immagine WebP
const webpSrc = computed(() => {
  if (!hasImage.value) return '';
  
  // Se è un URL Prismic
  if (props.project.image && props.project.image.url) {
    return props.project.image.url.replace(/\.[^.]+$/, '.webp');
  }
  
  // Altrimenti genera path per immagine locale
  if (props.project.imageUrl) {
    const baseName = props.project.imageUrl.replace(/\.[^.]+$/, '');
    return `/images/projects/${baseName}.webp`;
  }
  
  return '';
});

// Gestisce errori di caricamento immagine
const handleImageError = (event) => {
  console.error('Errore caricamento immagine:', event);
  event.target.src = '/images/projects/placeholder-project.jpg';
};

// Attiva lazy loading
onMounted(() => {
  if (process.client && !isImportantProject.value) {
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

<style scoped>
.img-responsive {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.lazy-image {
  opacity: 0;
  transition: opacity 0.3s;
}

.lazy-image.loaded {
  opacity: 1;
}
</style> 