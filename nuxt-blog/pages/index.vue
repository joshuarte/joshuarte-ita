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
    <section id="progetti" class="progetti-section">
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
    <section id="blog" class="blog-section">
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

<style lang="scss" scoped>
.hero {
  background-color: $light-bg;
  padding: $spacing-unit * 3 0;
  text-align: center;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: $spacing-unit;
    color: $text-color;
  }
  
  p {
    font-size: 1.2rem;
    color: lighten($text-color, 20%);
    max-width: 800px;
    margin: 0 auto $spacing-unit * 1.5;
  }
  
  .description {
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto $spacing-unit * 1.5;
    color: lighten($text-color, 20%);
  }
}

.progetti-section, .blog-section {
  padding: $spacing-unit * 4 0;
  
  h2 {
    text-align: center;
    margin-bottom: $spacing-unit * 2;
  }
  
  .view-all {
    text-align: center;
    margin-top: $spacing-unit * 2;
  }
}

.progetti-section {
  background-color: white;
}

.blog-section {
  background-color: $light-bg;
}
</style> 