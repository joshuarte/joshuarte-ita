<template>
  <header class="inner left text-center">
    <h1 class="h2" v-if="introText">{{ introText }}</h1>
    <h1 class="h2" v-else>{{ defaultIntroText }}</h1>
    
    <p>{{ description }}</p>
    
    <nav class="btn-transition-alt" aria-label="Contatti principali">
      <a 
        :href="`mailto:${socialData.mail}`"
        data-hover="RACCONTAMI DEL TUO PROGETTO"
        aria-label="Invia un'email"
      >
        <span>RACCONTAMI DEL TUO PROGETTO</span>
      </a>
    </nav>
    
    <p>Oppure scrivimi su:</p>
    
    <SocialIcons :aria-label="socialIconsLabel" />
  </header>
</template>

<script setup>
import SocialIcons from '~/components/SocialIcons.vue';

defineProps({
  introText: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: 'Dimentica le agenzie che ti trattano come un numero: sviluppo web artigianale con dedizione totale al tuo progetto.'
  },
  socialData: {
    type: Object,
    default: () => ({
      mail: 'joshuarte@gmail.com',
      discord: 'https://discordapp.com/channels/@joshuarte',
      linkedin: 'https://it.linkedin.com/in/joshuarte'
    })
  },
  socialIconsLabel: {
    type: String,
    default: 'Social media'
  },
  defaultIntroText: {
    type: String,
    default: 'Sviluppatore web e designer con una passione per l\'innovazione e la creatività.'
  }
});
</script>

<style lang="scss" scoped>
.inner.left {
  // Stili specifici per l'hero section se necessari
}

.btn-transition-alt {
  // Stili per il pulsante CTA
}
</style>