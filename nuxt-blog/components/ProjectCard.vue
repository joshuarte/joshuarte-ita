<template>
  <article class="col-md-12 no-padding">
    <!-- Link interno se non c'è URL esterno, altrimenti link esterno -->
    <NuxtLink 
      v-if="!project.url || project.url === '#'" 
      class="item" 
      :to="`/progetti/${project.uid}`"
    >
      <PrismicImageWrapper 
        :field="project.image"
        :alt="`frontend developer web designer napoli ${project.name} - ${getDescription}`" 
        :fallback-src="projectImagePath"
        image-class="project-image"
        :loading="isImportantProject ? 'eager' : 'lazy'"
      />
      <div class="caption">
        <h2>{{ project.name }}</h2>
        <p>
          {{ getDescription }} <span class="ion ion-link"></span>
        </p>
      </div>
    </NuxtLink>
    
    <!-- Link esterno se presente -->
    <a 
      v-else 
      class="item" 
      :href="project.url" 
      target="_blank" 
      rel="noopener"
    >
      <PrismicImageWrapper 
        :field="project.image"
        :alt="`frontend developer web designer napoli ${project.name} - ${getDescription}`" 
        :fallback-src="projectImagePath"
        image-class="project-image"
        :loading="isImportantProject ? 'eager' : 'lazy'"
      />
      <div class="caption">
        <h2>{{ project.name }}</h2>
        <p>
          {{ getDescription }} <span class="ion ion-android-exit"></span>
        </p>
      </div>
    </a>
  </article>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMainStore } from '~/stores';
import PrismicImageWrapper from '~/components/PrismicImageWrapper.vue';

const mainStore = useMainStore();

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
});

// Placeholder per immagini lazy
const placeholderImage = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201%201%22%3E%3C%2Fsvg%3E";

// Controlla se un campo è un Rich Text di Prismic
const isRichText = (field) => {
  return field && Array.isArray(field) && field.length > 0 && typeof field[0] === 'object';
};

// Verifica se il progetto è tra i primi 3 (caricamento immediato)
const isImportantProject = computed(() => {
  return props.index < 3;
});

// Ottiene il percorso dell'immagine
const projectImagePath = computed(() => {
  if (props.project.image && props.project.image.url) {
    return props.project.image.url;
  }
  return `/images/projects/${props.project.imageUrl || 'placeholder-project.jpg'}`;
});

// Ottiene la descrizione del progetto
const getDescription = computed(() => {
  if (isRichText(props.project.jobDescription)) {
    // Se è un rich text, proviamo a estrarre il testo semplice
    const firstTextBlock = props.project.jobDescription.find(block => 
      block.type === 'paragraph' && block.text
    );
    return firstTextBlock ? firstTextBlock.text : '';
  }
  return props.project.jobDescription || '';
});

// Gestione errori immagine non caricata
const handleImageError = (e) => {
  console.error('Errore caricamento immagine:', e);
  e.target.src = '/images/projects/placeholder-project.jpg';
};

// Implementazione del lazy loading per le immagini
onMounted(() => {
  if (process.client) {
    // Utilizziamo Intersection Observer per caricare le immagini lazy
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
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
    } else {
      // Fallback per browser che non supportano Intersection Observer
      lazyImages.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    }
  }
});
</script>

<style scoped lang="scss">
.col-md-12 {
  width: 100%;
  position: relative;
}

.no-padding {
  padding: 0;
}

.item {
  display: block;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  
  .img-responsive {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
  }
  
  &:hover .img-responsive {
    transform: scale(1.05);
  }
  
  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
    color: white;
    
    h2 {
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 1.4rem;
    }
    
    p {
      margin: 0;
      font-size: 0.95rem;
      
      .ion {
        margin-left: 5px;
      }
    }
  }
}

.lazy-image {
  opacity: 0;
  transition: opacity 0.3s;
  
  &.loaded {
    opacity: 1;
  }
}
</style>