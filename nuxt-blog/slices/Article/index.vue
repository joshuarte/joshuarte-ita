<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ArticleSlice>([
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
    class="article-content"
  >
    <div v-if="slice.primary && slice.primary.article" class="article-text">
      {{ slice.primary.article }}
    </div>
    
    <div v-else class="no-content">
      Nessun contenuto disponibile per questo articolo.
    </div>
  </section>
</template>

<style scoped>
.article-content {
  margin: 20px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.article-text {
  font-size: 1.1rem;
  line-height: 1.8;
}

.no-content {
  font-style: italic;
  color: #666;
  text-align: center;
  padding: 20px;
}
</style>
