<template>
  <section class="row module__bottom" aria-labelledby="bio-heading">
    <div class="col-sm-2">
      <h2 id="bio-heading" class="section-heading">{{ bioHeading }}</h2>
    </div>
    <div class="col-sm-10">
      <PrismicRichText :field="bioContent" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  bioHeading: {
    type: String,
    default: 'Bio'
  },
  bioContent: {
    type: [Object, Array],
    default: null
  }
});
</script>

<style lang="scss" scoped>
// Stili specifici per la sezione bio se necessari
</style>