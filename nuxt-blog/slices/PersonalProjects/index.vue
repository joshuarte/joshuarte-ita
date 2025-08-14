<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.PersonalProjectsSlice>([
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
    class="personal-projects-section row module__bottom"
    aria-labelledby="projects-heading"
  >
    <div class="col-sm-2">
      <h2 id="projects-heading" class="section-heading">
        {{ slice.primary.projects_heading || '<personal_projects/>' }}
      </h2>
    </div>
    <div class="col-sm-10">
      <ul class="projects-list">
        <li v-for="(item, index) in slice.items" :key="index" class="project-item">
          <div class="project-header">
            <h3 class="project-name">
              <PrismicLink v-if="item.project_url" :field="item.project_url" target="_blank">
                {{ item.project_name }}
              </PrismicLink>
              <span v-else>{{ item.project_name }}</span>
            </h3>
            <div class="project-meta">
              <span class="project-role">{{ item.project_role }}</span>
              <span class="project-period">{{ item.project_period }}</span>
            </div>
          </div>
          <div v-if="item.project_description" class="project-description">
            <PrismicRichText :field="item.project_description" />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.projects-list {
  list-style: none;
  padding: 0;
}

.project-item {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
}

.project-header {
  margin-bottom: 1rem;
}

.project-name {
  font-size: 1.2em;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.project-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
}

.project-role {
  font-weight: 600;
  color: #333;
}

.project-period {
  color: #666;
  font-style: italic;
}

.project-description {
  line-height: 1.6;
  
  :deep(p) {
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  :deep(strong) {
    font-weight: 600;
  }
  
  :deep(a) {
    color: #0066cc;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.section-heading {
  font-size: 1.17em;
  margin-top: 0;
  color: black;
  width: auto;
  font-weight: bold;
  margin-bottom: 25px;
}
</style>