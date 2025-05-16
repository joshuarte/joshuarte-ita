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

// Utilizziamo il client Prismic per ottenere i dati
const prismic = usePrismic();

// Fetch progetti data
const { data: projectDocs, pending: isProjectsLoading, error: projectsError } = useAsyncData('projects-page', async () => {
  try {
    return await prismic.client.getAllByType('projects');
  } catch(e) {
    console.error('Error fetching projects:', e);
    return [];
  }
});

// Process projects data to extract from slices
const projects = computed(() => {
  if (!projectDocs.value || !Array.isArray(projectDocs.value)) return [];
  
  return projectDocs.value.flatMap(doc => {
    if (!doc.data?.slices || !Array.isArray(doc.data.slices)) {
      return [];
    }
    
    return doc.data.slices
      .filter(slice => slice.slice_type === 'project')
      .map((slice, index) => {
        const primary = slice.primary || {};
        
        return {
          uid: doc.uid || `project-${index}`,
          name: primary.name || 'Progetto senza nome',
          image: primary.imageurl || null,
          imageUrl: primary.imageurl?.url || '/placeholder-project.jpg',
          jobDescription: primary.jobdescription || 'Descrizione non disponibile',
          url: primary.url || '#'
        };
      });
  });
});
</script>

<style lang="scss" scoped>
// Gli stili comuni sono ora gestiti dal file app.scss globale
.progetti-section {
  padding: 80px 0;
  
  .grid {
    margin-top: 5px * 2;
  }
}
</style> 