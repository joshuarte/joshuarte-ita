<template>
  <li>
    <p>
      <a 
        :href="job.url" 
        :title="job.company.toLowerCase()"
        target="_blank"
        rel="noopener"
      >
        <strong>{{ job.company }}</strong>
      </a>
    </p>
    <p>
      <strong>{{ job.position }}</strong> - {{ job.period }}
    </p>
    <p v-html="job.description"></p>
  </li>
</template>

<script setup>
defineProps({
  job: {
    type: Object,
    required: true,
    validator: (job) => {
      return job.company && job.position && job.period && job.description;
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