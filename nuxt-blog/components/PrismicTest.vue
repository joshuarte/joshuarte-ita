<template>
  <div>
    <h2>Test Prismic Connection</h2>
    <div v-if="loading">Loading Prismic data...</div>
    <div v-else-if="error">Error connecting to Prismic: {{ error }}</div>
    <div v-else>
      <p>Prismic connection successful!</p>
      <div v-if="homeTitle">
        <h3>HomeTitle Custom Type:</h3>
        <p>{{ homeTitle.id }}</p>
        <p>{{ homeTitle.uid }}</p>
      </div>
      <div v-else>
        <p>No HomeTitle content found. Make sure you have published content in Prismic.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $prismicCustom } = useNuxtApp()
const { client } = $prismicCustom

const { data: homeTitle, pending: loading, error } = useAsyncData('prismic-test', 
  () => client.getByType('hometitle')
    .then(response => {
      console.log('Prismic response:', response)
      return response.results[0] || null
    })
    .catch(err => {
      console.error('Prismic error:', err)
      return { error: err.message }
    })
)
</script> 