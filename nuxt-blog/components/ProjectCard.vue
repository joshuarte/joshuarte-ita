<template>
  <div class="project-card">
    <div class="project-image">
      <!-- Usa PrismicImage se il campo image è disponibile, altrimenti usa img standard -->
      <PrismicImage v-if="project.image" :field="project.image" class="image" />
      <img 
        v-else
        :src="project.imageUrl || '/placeholder-project.jpg'" 
        :alt="project.name"
        @error="handleImageError"
        class="image"
      />
    </div>
    <div class="project-content">
      <h3>{{ project.name }}</h3>
      
      <!-- Usa PrismicRichText per il jobDescription se è un campo strutturato -->
      <PrismicRichText v-if="isRichText(project.jobDescription)" :field="project.jobDescription" />
      <p v-else>{{ project.jobDescription }}</p>
      
      <div class="project-link">
        <PrismicLink v-if="isPrismicLink(project.url)" :field="project.url" class="btn btn-sm">Vedi Progetto</PrismicLink>
        <a v-else :href="projectUrl" target="_blank" class="btn btn-sm">Vedi Progetto</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

// Controlla se un campo è un Rich Text di Prismic
const isRichText = (field) => {
  return field && Array.isArray(field) && field.length > 0 && typeof field[0] === 'object';
};

// Controlla se un campo è un Link di Prismic
const isPrismicLink = (field) => {
  if (!field) return false;
  if (typeof field === 'string') return false;
  return typeof field === 'object' && (field.link_type || field.url);
};

// Elabora l'URL del progetto per gestire sia stringhe che oggetti Link di Prismic
const projectUrl = computed(() => {
  if (!props.project.url) return '#';
  if (typeof props.project.url === 'string') return props.project.url;
  if (props.project.url.url) return props.project.url.url;
  if (props.project.url.text) return props.project.url.text;
  return '#';
});

// Gestione errori immagine non caricata
const handleImageError = (e) => {
  console.error('Errore caricamento immagine:', e);
  e.target.src = '/placeholder-project.jpg';
}
</script>

<style scoped>
.project-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.project-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .image {
  transform: scale(1.05);
}

.project-content {
  padding: 20px;
}

.project-content h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.4rem;
}

.project-content p {
  color: #666;
  margin-bottom: 20px;
  font-size: 0.95rem;
  line-height: 1.5;
}

.project-link {
  display: flex;
  justify-content: flex-end;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 0.9rem;
}
</style> 