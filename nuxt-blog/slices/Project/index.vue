<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ProjectSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="project-content"
  >
    <div v-if="slice.primary" class="project-details">
      <h3 v-if="slice.primary.name">{{ slice.primary.name }}</h3>
      
      <div v-if="slice.primary.imageurl?.url" class="project-image">
        <PrismicImage 
          :field="slice.primary.imageurl" 
          :alt="slice.primary.name?.toString() || 'Progetto'"
          class="project-img"
        />
      </div>
      
      <div v-if="slice.primary.jobdescription" class="project-description">
        <PrismicRichText v-if="Array.isArray(slice.primary.jobdescription)" :field="slice.primary.jobdescription" />
        <div v-else v-html="slice.primary.jobdescription"></div>
      </div>
      
      <div v-if="slice.primary.url" class="project-link">
        <PrismicLink :field="slice.primary.url" class="btn">Vedi Progetto</PrismicLink>
      </div>
    </div>
    
    <div v-else class="no-content">
      Nessun dettaglio disponibile per questo progetto.
    </div>
  </section>
</template>

<style scoped>
.project-content {
  margin: 20px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project-image {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
}

.project-img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.project-description {
  font-size: 1.1rem;
  line-height: 1.8;
}

.project-link {
  margin-top: 20px;
}

.no-content {
  font-style: italic;
  color: #666;
  text-align: center;
  padding: 20px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
