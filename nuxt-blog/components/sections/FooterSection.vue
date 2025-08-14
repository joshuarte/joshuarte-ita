<template>
  <footer class="row">
    <div class="col-sm-10 offset-sm-2">
      <p class="h-align-left">
        <a href="#" data-module="modalToggle">
          <strong>privacy</strong>
        </a>
        &nbsp; | &copy; {{ startYear }}-{{ currentYear }} - &nbsp;
        <LogoLJM :width="logoWidth" />
      </p>
    </div>
  </footer>
</template>

<script setup>
import LogoLJM from '~/components/icons/LogoLJM.vue';
import { computed } from 'vue';

const props = defineProps({
  startYear: {
    type: [String, Number],
    default: 2010
  },
  logoWidth: {
    type: [String, Number],
    default: 100
  }
});

const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
footer {
  margin-top: 2rem;
  
  p {
    margin: 0;
    
    a {
      text-decoration: none;
      color: inherit;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.h-align-left {
  text-align: left;
}
</style>