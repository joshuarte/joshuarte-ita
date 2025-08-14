<template>
  <div class="main-container">
    <!-- Hero Section -->
    <HeroSection 
      :intro-text="homeData?.intro_text"
      :social-data="social"
      :intro-button="homeData?.intro_button"
      :intro-description="homeData?.intro_description"
    />
    <div class="inner right"
         :class="portfolioPanelClass"
         id="right">
      <div class="content">
        <div class="row">
          <div class="col-sm-10 offset-sm-2 module-notop">
            <LogoJoshuarte width="281.12"
                           height="100.938" />
          </div>
        </div>
        <div class="scrolling-content-wrapper">
          <div class="scrolling-content">
            <!-- Bio Section -->
            <BioSection 
              :bio-heading="homeData?.bio_heading || 'Bio'"
              :bio-content="homeData?.bio_content"
            />
            
            <!-- Skills Section -->
            <SkillsSection />
            
            <!-- Work Section -->
            <WorkSection />
            <!-- Personal Projects Section -->
            <PersonalProjectsSection />
          </div>
        </div>

        <!-- Recent Projects Button -->
        <RecentProjectsButton @toggle-portfolio="togglePortfolioPanel" />

        <!-- Footer -->
        <FooterSection />
      </div>
    </div>


    <div class="main-container right 	d-block d-sm-none">
      <div class="content">
        <h3 class="	d-block d-sm-none">&lt;recent projects/&gt;</h3>
      </div>
    </div>
    <!-- Aggiungiamo il panel gestito dallo store -->
    <PortfolioPanel :projects="projects" />
    <!-- La sezione right-portfolio è stata spostata nel componente PortfolioPanel -->

    <!-- {% include "shared/privacy.html" %} -->

    <!-- v-if="homeData && homeData.intro_description" 

          v-if="homeData && homeData.intro_button"
    :href="homeData.intro_button.url || '#'"-->



    <!-- Recent Blog Posts -->
    <!-- <section id="blog" class="blog-section">
      <div class="container">
        <h2>Articoli Recenti</h2>
        <RecentPosts :limit="3" />
        <div class="view-all">
          <NuxtLink to="/blog" class="btn btn-outline">Vedi tutti gli articoli</NuxtLink>
        </div>
      </div>
    </section>-->
  </div>
</template>

<script setup>
// Import dei componenti
import LogoJoshuarte from '~/components/icons/LogoJoshuarte.vue';
import HeroSection from '~/components/sections/HeroSection.vue';
import BioSection from '~/components/sections/BioSection.vue';
import SkillsSection from '~/components/sections/SkillsSection.vue';
import WorkSection from '~/components/sections/WorkSection.vue';
import PersonalProjectsSection from '~/components/sections/PersonalProjectsSection.vue';
import RecentProjectsButton from '~/components/RecentProjectsButton.vue';
import FooterSection from '~/components/sections/FooterSection.vue';
import { usePortfolioPanel } from '~/composables/usePortfolioPanel';
import { skills, workExperience, personalProjects, socialData } from '~/data/portfolio.js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

// Computed per i dati utilizzando la configurazione centralizzata
const skillsData = computed(() => skills);
const workData = computed(() => workExperience);
const personalProjectsData = computed(() => personalProjects);
const socialDataComputed = computed(() => socialData);

// SEO metadata
useHead({
  title: 'JOSHUARTE | Frontend Developer & UI/UX Designer',
  meta: [
    {
      name: 'description',
      content: 'Senior Frontend Developer & UI/UX Designer specializzato in JavaScript, React, Vue.js, Web Performance e Accessibilità. Portfolio di progetti web e game development.'
    }
  ]
});

// Dati social globali (utilizzando i dati centralizzati)
const social = inject('social', socialData);

// Utilizziamo il client Prismic per ottenere i dati
const prismic = usePrismic();

// Fetch Home data using the appropriate query based on the API response
const { data: homeDoc, pending: isHomeLoading, error: homeError } = useAsyncData('home', async () => {
  try {
    return await prismic.client.getSingle('home');
  } catch (e) {
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
        bio_heading: homeSlice.primary.bio_heading,
        bio_content: homeSlice.primary.bio_content,
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
  } catch (e) {
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
        const imageField = primary.imageurl;

        return {
          uid: doc.uid || `project-${index}`,
          name: primary.name || 'Progetto senza nome',
          image: imageField || null,
          // Use Prismic image helper to get optimized image URL
          imageUrl: imageField?.url 
            ? prismic.asImageSrc(imageField, { 
                width: 800,
                height: 600,
                fit: 'max'
              })
            : '/placeholder-project.jpg',
          jobDescription: primary.jobdescription || 'Descrizione non disponibile',
          url: primary.url || '#'
        };
      });
  });
});

// Utilizzo dello store per il pannello portfolio
const portfolioPanel = usePortfolioPanel();
const { isVisible } = storeToRefs(portfolioPanel);

// Calcola dinamicamente la classe del pannello
const portfolioPanelClass = computed(() => {
  return isVisible.value ? 'slideOutRight' : '';
});

// Funzione per attivare/disattivare il pannello portfolio
const togglePortfolioPanel = () => {
  portfolioPanel.toggle();
};
</script>

<style lang="scss" scoped>
// Rimosso stile non utilizzato
</style>