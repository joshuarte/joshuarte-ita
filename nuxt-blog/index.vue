<template>
  <div>
    <SliceZone v-if="page" :slices="page.data.slices" />
    <div v-else class="loading">Loading...</div>
  </div>
</template>

<script setup>
const { client } = usePrismic();

const { data: page } = await useAsyncData('home', () =>
  client.getSingle('home')
);
</script>

<style>
.loading {
  padding: 20px;
  text-align: center;
  font-size: 18px;
}
</style> 