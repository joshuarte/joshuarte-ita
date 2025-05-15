import { defineStore } from 'pinia';

export const usePrismicStore = defineStore('prismic', {
  state: () => ({
    homeData: null,
    projects: null,
    loading: {
      home: false,
      projects: false,
    },
    error: {
      home: null,
      projects: null,
    },
    lastFetch: {
      home: null,
      projects: null,
    },
  }),
  
  getters: {
    getHomeContent: (state) => state.homeData,
    getProjects: (state) => state.projects,
    isHomeLoading: (state) => state.loading.home,
    areProjectsLoading: (state) => state.loading.projects,
  },
  
  actions: {
    // Recupera i dati della home da Prismic
    async fetchHomeData() {
      // Evita richieste duplicate in rapida successione
      const now = Date.now();
      if (
        this.homeData && 
        this.lastFetch.home && 
        now - this.lastFetch.home < 60000
      ) {
        return this.homeData;
      }
      
      this.loading.home = true;
      this.error.home = null;
      
      try {
        const { client } = usePrismic();
        const doc = await client.getSingle('home');
        
        // Processiamo i dati per renderli più facili da utilizzare
        if (doc && doc.data) {
          // Estrai i dati dalle slices
          if (doc.data.slices && doc.data.slices.length > 0) {
            const homeSlice = doc.data.slices.find((slice: any) => slice.slice_type === 'home');
            if (homeSlice && homeSlice.primary) {
              this.homeData = {
                intro_text: homeSlice.primary.intro_text || '',
                intro_description: homeSlice.primary.intro_description?.[0]?.type || '',
                intro_button: homeSlice.primary.intro_button || null
              };
            }
          } 
          // Oppure direttamente dal documento
          else {
            this.homeData = {
              intro_text: (doc.data as any).intro_text || '',
              intro_description: (doc.data as any).intro_description?.[0]?.text || '',
              intro_button: (doc.data as any).intro_button || null
            };
          }
        }
        
        this.lastFetch.home = now;
        return this.homeData;
      } catch (error: any) {
        console.error('Errore nel recupero dati home:', error);
        this.error.home = error.message || 'Errore nel recupero dei dati';
        return null;
      } finally {
        this.loading.home = false;
      }
    },
    
    // Recupera i progetti da Prismic
    async fetchProjects() {
      // Evita richieste duplicate in rapida successione
      const now = Date.now();
      if (
        this.projects && 
        this.lastFetch.projects && 
        now - this.lastFetch.projects < 60000
      ) {
        return this.projects;
      }
      
      this.loading.projects = true;
      this.error.projects = null;
      
      try {
        const nuxtApp = useNuxtApp();
        
        // Determina quale client usare
        let client: any = null;
        
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
        
        // Effettua la chiamata a Prismic per il tipo 'projects' (plurale!)
        const response = await client.getAllByType('projects');
        
        if (!response || response.length === 0) {
          this.projects = [];
          return [];
        }
        
        // Estrai i progetti dalle slices, usando la stessa logica del composable originale
        this.projects = response.flatMap((document: any) => {
          // Verifico se ci sono slices
          if (!document.data?.slices || !Array.isArray(document.data.slices)) {
            return [];
          }
          
          // Filtro le slices di tipo "project"
          return document.data.slices
            .filter((slice: any) => slice.slice_type === 'project')
            .map((slice: any, index: number) => {
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
        
        this.lastFetch.projects = now;
        return this.projects;
      } catch (error: any) {
        console.error('Errore nel recupero progetti:', error);
        this.error.projects = error.message || 'Errore nel recupero dei progetti';
        return [];
      } finally {
        this.loading.projects = false;
      }
    }
  }
}); 