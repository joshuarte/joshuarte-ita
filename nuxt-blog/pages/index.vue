<template>
  <div class="container">
    <div class="hero">
      <h1>JOSHUARTE</h1>
      <p>Frontend Developer & UI/UX Designer</p>
      <p>Questa è la versione blog del sito. Per il portfolio completo, visita il sito principale.</p>
      <a href="https://www.joshuarte.it" class="btn">Vai al sito principale</a>
    </div>
    
    <RecentPosts title="Articoli recenti" :limit="3" :showViewAll="true" />
    
    <PrismicTest />
  </div>
</template>

<script setup>
// Setup SEO per la pagina
useHead({
  title: 'JOSHUARTE | Frontend Developer & UI/UX Designer',
  meta: [
    { name: 'description', content: 'Senior Frontend Developer & UI/UX Designer specializzato in JavaScript, React, Vue.js, Web Performance e Accessibilità.' }
  ]
})
</script> 