<template>
  <div :class="['loader', { 'hidden': isLoaded }]" aria-hidden="true"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoaded = ref(false);

onMounted(() => {
  // Aggiungiamo una classe al body per nascondere il loader una volta caricata la pagina
  document.body.classList.add('loaded');
  
  // Nascondiamo il loader dopo un breve timeout per assicurarci che tutto sia caricato
  setTimeout(() => {
    isLoaded.value = true;
  }, 500);
});
</script>

<style scoped>
.hidden {
  opacity: 0;
  pointer-events: none;
}
</style> 