<template>
  <div>
    <AppIcons />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
// Layout principale predefinito
</script>

<style lang="scss" scoped>
.site-header {
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: flex-end;
  }
  
  .theme-toggle {
    position: relative;
    z-index: 10;
  }
}
</style> 