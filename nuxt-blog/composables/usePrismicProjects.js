import { ref, onMounted } from 'vue';

export const usePrismicProjects = () => {
  const projects = ref([]);
  const isLoading = ref(true);
  const error = ref(null);

  const fetchProjects = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const nuxtApp = useNuxtApp();
      
      // Determina quale client usare
      let client = null;
      
      if (nuxtApp.$prismicCustom) {
        client = nuxtApp.$prismicCustom;
      } else if (nuxtApp.$prismic && nuxtApp.$prismic.client) {
        client = nuxtApp.$prismic.client;
      } else if (nuxtApp.$prismic) {
        client = nuxtApp.$prismic;
      }
      
      if (!client) {
        throw new Error('Nessun client Prismic disponibile');
      }
      
      // Effettua la chiamata a Prismic per il tipo 'projects'
      const response = await client.getAllByType('projects');
      
      if (!response || response.length === 0) {
        projects.value = [];
        return;
      }
      
      // Estrai i progetti dalle slices
      projects.value = response.flatMap(document => {
        // Verifico se ci sono slices
        if (!document.data?.slices || !Array.isArray(document.data.slices)) {
          return [];
        }
        
        // Filtro le slices di tipo "project"
        return document.data.slices
          .filter(slice => slice.slice_type === 'project')
          .map((slice, index) => {
            // Estraggo i dati dal primary della slice
            const primary = slice.primary || {};
            
            return {
              uid: `${document.uid}-${index}`,
              name: primary.name || 'Progetto senza nome',
              image: primary.imageurl || null,
              imageUrl: primary.imageurl?.url || '/placeholder-project.jpg',
              jobDescription: primary.jobdescription || 'Descrizione non disponibile',
              url: primary.url || '#'
            };
          });
      });
      
    } catch (e) {
      console.error('Errore nel recupero dei progetti:', e);
      error.value = e.message || 'Errore sconosciuto';
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchProjects();
  });

  return {
    projects,
    isLoading,
    error,
    fetchProjects
  };
}; 