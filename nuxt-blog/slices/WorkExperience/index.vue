<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.WorkExperienceSlice>([
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
    class="work-section row module__bottom"
    aria-labelledby="work-heading"
  >
    <div class="col-sm-2">
      <h2 id="work-heading" class="section-heading">
        {{ slice.primary.work_heading || '<work/>' }}
      </h2>
    </div>
    <div class="col-sm-10">
      <ul class="job-list">
        <li v-for="(item, index) in slice.items" :key="index" class="job-item">
          <div class="job-header">
            <h3 class="company-name">
              <PrismicLink v-if="item.company_url" :field="item.company_url" target="_blank">
                {{ item.company_name }}
              </PrismicLink>
              <span v-else>{{ item.company_name }}</span>
            </h3>
            <div class="job-meta">
              <span class="position">{{ item.position }}</span>
              <span class="period">{{ item.period }}</span>
            </div>
          </div>
          <div v-if="item.description" class="job-description">
            <PrismicRichText :field="item.description" />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.job-list {
  list-style: none;
  padding: 0;
}

.job-item {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
}

.job-header {
  margin-bottom: 1rem;
}

.company-name {
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

.job-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
}

.position {
  font-weight: 600;
  color: #333;
}

.period {
  color: #666;
  font-style: italic;
}

.job-description {
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