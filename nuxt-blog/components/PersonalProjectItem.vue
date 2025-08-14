<template>
  <li>
    <p>
      <a 
        :href="project.url" 
        :title="project.name.toLowerCase() + ' ' + project.role.toLowerCase()"
        target="_blank"
        rel="noopener"
      >
        <strong>{{ project.name }}</strong>
      </a>
    </p>
    <p>
      <strong>{{ project.role }}</strong> - {{ project.period }}
    </p>
    <p v-html="project.description"></p>
  </li>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
    validator: (project) => {
      return project.name && project.role && project.period && project.description;
    }
  }
});
</script>

<style lang="scss" scoped>
li {
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 0.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  a {
    text-decoration: none;
    color: inherit;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>