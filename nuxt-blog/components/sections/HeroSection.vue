<template>
  <header class="inner left text-center">
    <h1 class="h2" v-if="introText">{{ introText }}</h1>
    <h1 class="h2" v-else>{{ defaultIntroText }}</h1>
    
    <p>{{ introDescription }}</p>
    
    <nav class="btn-transition-alt" aria-label="Contatti principali">
      <a 
        :href="introButton.url"
        :data-hover=introButton.text
        aria-label="Invia un'email"
      >
        <span>{{ introButton.text }}</span>

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
  introButton: {
    type: Object,
    default: () => ({
      "link_type": "Web",
      "key": "f2e93ca3-217b-47c6-8ead-8f1e2b6aa2c2",
      "url": "",
      "text": ""
    })
  },
  introDescription: {
    type: String,
    default: ''
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