<template>
  <div class="prismic-image-wrapper">
    <PrismicImage 
      v-if="field?.url"
      :field="field"
      :alt="alt"
      :class="imageClass"
      :loading="loading"
    />
    <img 
      v-else-if="fallbackSrc"
      :src="fallbackSrc"
      :alt="alt"
      :class="imageClass"
      :loading="loading"
      @error="handleImageError"
    />
    <div 
      v-else-if="showPlaceholder"
      :class="['image-placeholder', imageClass]"
      :aria-label="alt"
    >
      <span class="placeholder-text">{{ placeholderText }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // Campo immagine di Prismic
  field: {
    type: Object,
    default: null
  },
  // Testo alternativo
  alt: {
    type: String,
    default: 'Immagine'
  },
  // Classi CSS da applicare all'immagine
  imageClass: {
    type: [String, Array, Object],
    default: ''
  },
  // Immagine di fallback se Prismic non è disponibile
  fallbackSrc: {
    type: String,
    default: null
  },
  // Mostra placeholder se nessuna immagine è disponibile
  showPlaceholder: {
    type: Boolean,
    default: true
  },
  // Testo del placeholder
  placeholderText: {
    type: String,
    default: 'Immagine non disponibile'
  },
  // Attributo loading
  loading: {
    type: String,
    default: 'lazy'
  }
});

// Gestione errori immagine
const handleImageError = (e) => {
  console.warn('Errore caricamento immagine:', e.target.src);
  // Potresti emettere un evento per gestire l'errore nel componente padre
};
</script>

<style scoped>
.prismic-image-wrapper {
  display: inline-block;
  width: 100%;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: 2px dashed #ddd;
  border-radius: 4px;
  min-height: 200px;
  color: #666;
}

.placeholder-text {
  font-size: 0.9rem;
  text-align: center;
}
</style>