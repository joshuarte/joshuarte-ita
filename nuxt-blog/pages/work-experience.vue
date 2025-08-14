<template>
  <div>
    <section class="page-header">
      <div class="container">
        <h1>Esperienza Lavorativa</h1>
        <p>Il mio percorso professionale e le esperienze che mi hanno formato</p>
      </div>
    </section>

    <!-- Render WorkExperience slice -->
    <SliceZone 
      v-if="workExperienceDoc?.data?.slices"
      :slices="workExperienceDoc.data.slices" 
      :components="components" 
    />
    
    <!-- Fallback content -->
    <section v-else class="work-section">
      <div class="container">
        <div class="no-content">
          Nessuna esperienza lavorativa disponibile al momento.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { defineSliceZoneComponents } from '@prismicio/vue';

// Define slice components for SliceZone
const components = defineSliceZoneComponents({
  work_experience: () => import('~/slices/WorkExperience/index.vue')
});

// SEO metadata
useHead({
  title: 'Esperienza Lavorativa | Joshua Rte.',
  meta: [
    { 
      name: 'description', 
      content: 'Scopri l\'esperienza lavorativa di Joshua Rte., sviluppatore web con competenze in frontend, backend e design.'
    }
  ]
});

// Utilizziamo il client Prismic per ottenere i dati
const prismic = usePrismic();

// Fetch home document that contains WorkExperience slice
const { data: workExperienceDoc, pending: isLoading, error } = useAsyncData('work-experience', async () => {
  try {
    // Try to get from home document first
    const homeDoc = await prismic.client.getSingle('home');
    if (homeDoc?.data?.slice_zone) {
      // Filter to only include WorkExperience slices
      const workExperienceSlices = homeDoc.data.slice_zone.filter(
        slice => slice.slice_type === 'work_experience'
      );
      if (workExperienceSlices.length > 0) {
        return {
          ...homeDoc,
          data: {
            ...homeDoc.data,
            slices: workExperienceSlices
          }
        };
      }
    }
    
    // Fallback: create a mock document with WorkExperience slice
    return {
      data: {
        slices: [{
          slice_type: 'work_experience',
          variation: 'default',
          primary: {
            work_heading: 'Esperienza Lavorativa'
          },
          items: []
        }]
      }
    };
  } catch(e) {
    console.error('Error fetching work experience:', e);
    return null;
  }
});
</script>

<style lang="scss" scoped>
.page-header {
  padding: 80px 0 40px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.work-section {
  padding: 80px 0;
  
  .no-content {
    text-align: center;
    font-size: 1.1rem;
    color: #666;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .page-header {
    padding: 60px 0 30px;
    
    h1 {
      font-size: 2.2rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
}
</style>