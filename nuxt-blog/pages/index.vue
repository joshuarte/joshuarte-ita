<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>Joshua Rte.</h1>
        <p v-if="homeData && homeData.intro_text">{{ homeData.intro_text }}</p>
        <p v-else>Sviluppatore web e designer con una passione per l'innovazione e la creatività.</p>
        
        <div v-if="homeData && homeData.intro_description" class="description">
          {{ homeData.intro_description }}
        </div>
        
        <a v-if="homeData && homeData.intro_button" :href="homeData.intro_button.url || '#'" class="btn">
          {{ homeData.intro_button.text || 'Contattami' }}
        </a>
        <NuxtLink v-else to="/contatti" class="btn">Contattami</NuxtLink>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="progetti">
      <div class="container">
        <h2>I Miei Progetti</h2>
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
import { usePrismicStore } from '~/stores/prismic';

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

// Utilizziamo lo store Pinia per gestire i dati di Prismic
const prismicStore = usePrismicStore();

// Recuperiamo i dati della home page
await prismicStore.fetchHomeData();
const homeData = computed(() => prismicStore.getHomeContent);
const isHomeLoading = computed(() => prismicStore.isHomeLoading);
const homeError = computed(() => prismicStore.error.home);

// Recuperiamo i progetti
await prismicStore.fetchProjects();
const projects = computed(() => prismicStore.getProjects);
const isProjectsLoading = computed(() => prismicStore.areProjectsLoading);
const projectsError = computed(() => prismicStore.error.projects);
</script>

<style scoped>
.hero {
  background-color: #f8f9fa;
  padding: 3rem 0;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 1.5rem;
}

.description {
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto 1.5rem;
  color: #666;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #007bff;
  color: #007bff;
}

.btn-outline:hover {
  background-color: #007bff;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

section {
  padding: 3rem 0;
}

section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #333;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.view-all {
  text-align: center;
  margin-top: 2rem;
}

.loading, .error, .no-content {
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 1rem 0;
}

.error {
  color: #dc3545;
}
</style> 