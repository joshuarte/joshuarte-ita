<template>
  <div>
    <NuxtLink to="/" class="back-to-home">Torna alla Home</NuxtLink>
    
    <div class="mosca-content">
      <div class="mosca-header">
        <h1>MOSCA NELLA MMERDA</h1>
        <div class="mosca-intro">
          <p>Una mostra sulla società dei consumi, il consumo delle persone e il consumo della terra.</p>
        </div>
      </div>
      
      <div class="mosca-gallery">
        <div v-for="i in 9" :key="i" class="mosca-item">
          <img :src="`/images/mnm/mnm${i}.webp`" alt="Mosca Nella Mmerda Artwork" />
        </div>
      </div>
      
      <div class="mosca-about">
        <h2>IL PROGETTO</h2>
        <p>
          Una mostra irriverente che utilizza l'arte per esplorare le contraddizioni della società moderna. 
          Metafore visive, humor nero e provocazioni per riflettere sul consumismo sfrenato e il suo impatto 
          sull'ambiente e sulle persone.
        </p>
        <p>
          Attraverso una serie di installazioni e opere d'arte, MOSCA NELLA MMERDA invita lo spettatore a 
          riconsiderare il proprio rapporto con il consumo e a riflettere sulla sostenibilità delle nostre 
          abitudini quotidiane.
        </p>
      </div>
      
      <div class="mosca-cta">
        <a href="https://www.instagram.com/moscanellammerda/" target="_blank" class="mosca-btn">
          SEGUICI SU INSTAGRAM
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

// Imposta il layout per questa pagina
definePageMeta({
  layout: 'mosca'
});

// Impostiamo la classe al body per lo stile speciale
onMounted(() => {
  document.body.classList.add('mosca-page');
  
  // Rimuoviamo la classe quando il componente viene smontato
  onUnmounted(() => {
    document.body.classList.remove('mosca-page');
  });
});

// SEO metadata
useHead({
  title: 'MOSCA NELLA MMERDA | Joshua Rte.',
  meta: [
    { 
      name: 'description', 
      content: 'MOSCA NELLA MMERDA - Una mostra sulla società dei consumi, il consumo delle persone e il consumo della terra.'
    }
  ]
});
</script>

<style scoped>
.mosca-content {
  padding: 100px 20px 50px;
  max-width: 1200px;
  margin: 0 auto;
  color: #ff38b8;
  font-family: "Comic Sans MS", cursive, sans-serif;
}

.mosca-header {
  text-align: center;
  margin-bottom: 50px;
}

.mosca-header h1 {
  font-size: 4rem;
  text-shadow: 3px 3px 0 #59b2c2;
  margin-bottom: 20px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.mosca-intro {
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 10px;
  color: #333;
}

.mosca-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 50px 0;
}

.mosca-item {
  background: white;
  padding: 10px;
  border-radius: 8px;
  transform: rotate(calc(var(--random, 0) * 6deg));
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.mosca-item:nth-child(odd) {
  --random: 1;
}

.mosca-item:nth-child(even) {
  --random: -1;
}

.mosca-item:hover {
  transform: rotate(0) scale(1.05);
  z-index: 10;
}

.mosca-item img {
  width: 100%;
  border-radius: 4px;
}

.mosca-about {
  background: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 15px;
  margin: 50px 0;
  color: #333;
}

.mosca-about h2 {
  color: #ff38b8;
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
}

.mosca-about p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.6;
}

.mosca-cta {
  text-align: center;
  margin-top: 50px;
}

.mosca-btn {
  display: inline-block;
  background: #ff38b8;
  color: white;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  border: 3px solid #59b2c2;
}

.mosca-btn:hover {
  background: #59b2c2;
  color: #ff38b8;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .mosca-header h1 {
    font-size: 2.5rem;
  }
  
  .mosca-intro {
    font-size: 1.2rem;
  }
  
  .mosca-gallery {
    grid-template-columns: 1fr;
  }
}
</style> 