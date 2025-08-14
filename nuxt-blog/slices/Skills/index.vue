<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.SkillsSlice>([
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
    class="skills-section row module__bottom"
    aria-labelledby="skills-heading"
  >
    <div class="col-sm-2">
      <h2 id="skills-heading" class="section-heading">
        {{ slice.primary.skills_heading || '<skills/>' }}
      </h2>
    </div>
    <div class="col-sm-10">
      <ul class="skills-list">
        <li v-for="(item, index) in slice.items" :key="index">
          <p>
            <b>{{ item.skill_title }}</b> ({{ item.skill_technologies }})
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.skills-list {
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: 1rem;
    
    p {
      margin: 0;
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