<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { defineSliceZoneComponents } from "@prismicio/vue";

// Il modello delle Slice potrebbe non essere aggiornato ai tipi
// Utilizziamo as any per evitare errori TypeScript temporaneamente
const props = defineProps(
  getSliceComponentProps<Content.HomeSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

// Accediamo ai campi in modo type-safe
const slice = props.slice as any;

// Componenti per la slice zone
const components = defineSliceZoneComponents({
  skills: () => import("../Skills/index.vue"),
  work_experience: () => import("../WorkExperience/index.vue"),
  personal_projects: () => import("../PersonalProjects/index.vue"),
});
</script>

<template>
  <div
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="home-page"
  >
    <!-- Hero Section -->
    <section class="home-intro">
      <div class="container">
        <div v-if="slice.primary.hero_image?.url" class="hero-image">
          <PrismicImage 
            :field="slice.primary.hero_image" 
            :alt="slice.primary.intro_title || 'Hero Image'"
            class="hero-img"
          />
        </div>
        
        <h1 v-if="slice.primary.intro_title" class="intro-title">
          {{ slice.primary.intro_title }}
        </h1>
        
        <div v-if="slice.primary.intro_description" class="intro-description">
          <PrismicRichText :field="slice.primary.intro_description" />
        </div>
        
        <div v-if="slice.primary.intro_button" class="cta-button">
          <PrismicLink :field="slice.primary.intro_button" class="button">
            Scopri di più
          </PrismicLink>
        </div>
      </div>
    </section>

    <!-- Bio Section -->
    <section v-if="slice.primary.bio_heading || slice.primary.bio_content" class="bio-section">
      <div class="container">
        <h2 v-if="slice.primary.bio_heading" class="section-title">
          {{ slice.primary.bio_heading }}
        </h2>
        <div v-if="slice.primary.bio_content" class="bio-content">
          <PrismicRichText :field="slice.primary.bio_content" />
        </div>
      </div>
    </section>

    <!-- Skills and Work Experience Slice Zone -->
    <div v-if="slice.slice_zone && slice.slice_zone.length > 0" class="slice-zone">
      <SliceZone :slices="slice.slice_zone" :components="components" />
    </div>

    <!-- Projects Section -->
    <section v-if="slice.primary.projects_heading" class="projects-section">
      <div class="container">
        <h2 class="section-title">
          {{ slice.primary.projects_heading }}
        </h2>
        <div v-if="slice.primary.projects_list" class="projects-link">
          <PrismicLink :field="slice.primary.projects_list" class="button">
            Vedi tutti i progetti
          </PrismicLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.home-intro {
  padding: 60px 0;
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hero-image {
  margin-bottom: 2rem;
}

.hero-img {
  max-width: 300px;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.intro-title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
}

.intro-description {
  max-width: 800px;
  margin: 0 auto 2rem;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #5a6c7d;
}

/* Bio Section */
.bio-section {
  padding: 80px 0;
  background: #ffffff;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #2c3e50;
  font-weight: 600;
}

.bio-content {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.7;
  text-align: center;
  color: #5a6c7d;
}

/* Slice Zone */
.slice-zone {
  background: #f8f9fa;
}

/* Projects Section */
.projects-section {
  padding: 80px 0;
  background: #ffffff;
  text-align: center;
}

.projects-link {
  margin-top: 2rem;
}

/* Button Styles */
.button {
  display: inline-block;
  padding: 15px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .intro-title {
    font-size: 2.2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .hero-img {
    max-width: 200px;
  }
  
  .home-intro,
  .bio-section,
  .projects-section {
    padding: 60px 0;
  }
}
</style>
