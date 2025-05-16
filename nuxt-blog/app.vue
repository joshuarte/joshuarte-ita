<template>
  <div>
    <!-- Preload dell'immagine di sfondo -->
    <NuxtImg src="/images/bg.jpg" preload width="1920" height="1080" alt="Immagine di sfondo" format="webp" quality="80" style="display: none;" />
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// App principale di Nuxt
useHead({
  title: 'Joshua Rte.',
  meta: [
    { name: 'description', content: 'Portfolio e blog personale di Joshua Rte.' }
  ]
});

// Dati per i social media accessibili in tutto l'app
const social = {
  mail: 'joshuarte@gmail.com',
  discord: 'https://discordapp.com/channels/@joshuarte',
  linkedin: 'https://it.linkedin.com/in/joshuarte'
};

// Rendiamo disponibili i dati sociali in tutta l'applicazione
provide('social', social);

// Impostiamo un plugin per il caricamento della pagina
onMounted(() => {
  // Aggiungiamo una classe al body per indicare che la pagina è completamente caricata
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});
</script>

<style>
.app {
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

.dark-theme {
  background-color: #121212;
  color: #f5f5f5;
}
</style> 