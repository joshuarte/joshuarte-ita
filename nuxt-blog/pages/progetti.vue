<template>
  <div>
    <section class="page-header">
      <div class="container">
        <h1>I Miei Progetti</h1>
        <p>Esplora i progetti su cui ho lavorato</p>
      </div>
    </section>

    <section class="progetti-section">
      <div class="container">
        <div v-if="isProjectsLoading" class="loading">Caricamento progetti...</div>
        <div v-else-if="projectsError" class="error">
          Si è verificato un errore nel caricamento dei progetti: {{ projectsError }}
        </div>
        <div v-else-if="projects && projects.length" class="grid">
          <ProjectCard 
            v-for="project in projects" 
            :key="project.uid" 
            :project="project" 
          />
        </div>
        <div v-else class="no-content">
          Nessun progetto disponibile al momento.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { usePrismicStore } from '~/stores/prismic';

// SEO metadata
useHead({
  title: 'Progetti | Joshua Rte.',
  meta: [
    { 
      name: 'description', 
      content: 'Esplora i progetti di Joshua Rte., sviluppatore web e designer. Portfolio di lavori e progetti creativi nel campo del web development.'
    }
  ]
});

// Utilizziamo lo store Pinia per gestire i dati di Prismic
const prismicStore = usePrismicStore();

// Recuperiamo i progetti
await prismicStore.fetchProjects();
const projects = computed(() => prismicStore.getProjects);
const isProjectsLoading = computed(() => prismicStore.areProjectsLoading);
const projectsError = computed(() => prismicStore.error.projects);
</script>

<style lang="scss" scoped>
// Gli stili comuni sono ora gestiti dal file app.scss globale
.progetti-section {
  padding: 80px 0;
  
  .grid {
    margin-top: $spacing-unit * 2;
  }
}
</style> 