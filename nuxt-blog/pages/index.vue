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

// Utilizziamo il client Prismic per ottenere i dati
const prismic = usePrismic();

// Fetch Home data using the appropriate query based on the API response
const { data: homeDoc, pending: isHomeLoading, error: homeError } = useAsyncData('home', async () => {
  try {
    return await prismic.client.getSingle('home');
  } catch(e) {
    console.error('Error fetching home document:', e);
    return null;
  }
});

// Process home data to extract content from slices
const homeData = computed(() => {
  if (!homeDoc.value || !homeDoc.value.data) return null;
  
  // Extract data from slices if present
  if (homeDoc.value.data.slices && homeDoc.value.data.slices.length > 0) {
    const homeSlice = homeDoc.value.data.slices.find(slice => slice.slice_type === 'home');
    if (homeSlice && homeSlice.primary) {
      return {
        intro_text: homeSlice.primary.intro_text || '',
        intro_description: homeSlice.primary.intro_description?.[0]?.text || '',
        intro_button: homeSlice.primary.intro_button || null
      };
    }
  }
  
  // Otherwise use direct document data
  return {
    intro_text: homeDoc.value.data.intro_text || '',
    intro_description: homeDoc.value.data.intro_description?.[0]?.text || '',
    intro_button: homeDoc.value.data.intro_button || null
  };
});

// Fetch projects data
const { data: projectDocs, pending: isProjectsLoading, error: projectsError } = useAsyncData('projects', async () => {
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