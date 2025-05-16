<template>
  <ul class="list-inline" :aria-label="ariaLabel">
    <li v-if="showDiscord">
      <a :href="discordUrl" target="_blank" rel="noopener" aria-label="Discord profile">
        <DiscordIcon :size="iconSize" :color="iconColor" />
        <span class="sr-only">Discord</span>
      </a>
    </li>
    <li v-if="showLinkedin">
      <a :href="linkedinUrl" target="_blank" rel="noopener" aria-label="LinkedIn profile">
        <LinkedinIcon :size="iconSize" :color="iconColor" />
        <span class="sr-only">LinkedIn</span>
      </a>
    </li>
    <!-- Qui possiamo aggiungere facilmente altre icone social in futuro -->
  </ul>
</template>

<script>
// Valori predefiniti per i social
const defaultSocial = {
  discord: 'https://discordapp.com/channels/@joshuarte',
  linkedin: 'https://it.linkedin.com/in/joshuarte'
};

export default {
  props: {
    // Permette di mostrare/nascondere specifiche icone
    showDiscord: {
      type: Boolean,
      default: true
    },
    showLinkedin: {
      type: Boolean,
      default: true
    },
    // Permette di sovrascrivere gli URL dei social
    discordUrl: {
      type: String,
      default: () => defaultSocial.discord
    },
    linkedinUrl: {
      type: String,
      default: () => defaultSocial.linkedin
    },
    // Permette di personalizzare dimensione e colore delle icone
    iconSize: {
      type: [String, Number],
      default: '30'
    },
    iconColor: {
      type: String,
      default: '#FFFFFF'
    },
    // Permette di personalizzare l'attributo aria-label
    ariaLabel: {
      type: String,
      default: 'Social media'
    }
  }
}
</script>

<script setup>
import { inject } from 'vue';
import DiscordIcon from '~/components/icons/DiscordIcon.vue';
import LinkedinIcon from '~/components/icons/LinkedinIcon.vue';

// Recuperiamo i dati social dalla provide/inject
// Ora viene usato solo per sovrascrivere i valori predefiniti quando necessario
const socialData = inject('social', {
  discord: 'https://discordapp.com/channels/@joshuarte',
  linkedin: 'https://it.linkedin.com/in/joshuarte'
});
</script> 