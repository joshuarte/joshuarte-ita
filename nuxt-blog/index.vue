<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>Joshua Rte.</h1>
        <p>Sviluppatore web e designer con una passione per l'innovazione e la creatività.</p>
        <NuxtLink to="/contatti" class="btn">Contattami</NuxtLink>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="progetti">
      <div class="container">
        <h2>I Miei Progetti</h2>
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
        <div class="view-all">
          <NuxtLink to="/progetti" class="btn btn-outline">Vedi tutti i progetti</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Recent Blog Posts -->
    <section id="blog">
      <div class="container">
        <h2>Articoli Recenti</h2>
        <RecentPosts :limit="3" />
        <div class="view-all">
          <NuxtLink to="/blog" class="btn btn-outline">Vedi tutti gli articoli</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app';

// SEO metadata
useHead({
  title: 'Joshua Rte. - Sviluppatore Web & Designer',
  meta: [
    { 
      name: 'description', 
      content: 'Portfolio e blog personale di Joshua Rte., sviluppatore web e designer con progetti creativi e articoli sul mondo del web development.'
    }
  ]
});

// Fetch projects from Prismic
const { data: projects, pending, error } = useAsyncData('projects', async () => {
  try {
    const { prismicCustom } = useNuxtApp();
    const response = await prismicCustom.getAllByType('project');
    
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
.view-all {
  text-align: center;
  margin-top: 40px;
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