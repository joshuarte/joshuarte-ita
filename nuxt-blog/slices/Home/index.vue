<script setup lang="ts">
import type { Content } from "@prismicio/client";

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
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="home-intro"
  >
    <div class="container">
      <h1 v-if="slice.primary.intro_title" class="intro-title">
        {{ slice.primary.intro_title }}
      </h1>
      
      <div v-if="slice.primary.intro_text" class="intro-text">
        <PrismicRichText :field="slice.primary.intro_text" />
      </div>
      
      <div v-if="slice.primary.button_text && slice.primary.button_link" class="cta-button">
        <PrismicLink :field="slice.primary.button_link" class="button">
          {{ slice.primary.button_text }}
        </PrismicLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-intro {
  padding: 60px 20px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}

.intro-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.intro-text {
  max-width: 800px;
  margin: 0 auto 2rem;
  font-size: 1.2rem;
  line-height: 1.6;
}

.button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #0066cc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0052a3;
}
</style>
