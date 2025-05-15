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
        <div v-if="pending" class="loading">Caricamento progetti...</div>
        <div v-else-if="error" class="error">Si è verificato un errore nel caricamento dei progetti.</div>
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
import { useAsyncData } from 'nuxt/app';

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

// Fetch all projects from Prismic
const { data: projects, pending, error } = useAsyncData('progetti-page', async () => {
  try {
    const { prismicCustom } = useNuxtApp();
    const response = await prismicCustom.getAllByType('project', {
      orderings: [
        { field: 'document.first_publication_date', direction: 'desc' }
      ]
    });
    
    return response.map(project => ({
      uid: project.uid,
      name: project.data.name || 'Progetto',
      imageUrl: project.data.image?.url || '/placeholder-project.jpg',
      jobDescription: project.data.job_description || 'Descrizione non disponibile',
      url: project.data.url || '#'
    }));
  } catch (e) {
    console.error('Errore nel recupero dei progetti:', e);
    return [];
  }
});
</script>

<style scoped>
.page-header {
  background-color: #333;
  color: #fff;
  padding: 60px 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.page-header p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.8;
}

.progetti-section {
  padding: 80px 0;
}

.loading, .error, .no-content {
  text-align: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 20px 0;
}

.error {
  color: #e74c3c;
}
</style> 