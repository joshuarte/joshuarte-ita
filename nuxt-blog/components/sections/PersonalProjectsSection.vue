<template>
  <section class="row" aria-labelledby="hobby-heading">
    <div class="col-sm-2">
      <h2 id="hobby-heading" class="section-heading">
        &lt;personal &lt;br/&gt;
        <br />projects/&gt;
      </h2>
    </div>
    <div class="col-sm-10">
      <ul class="job-list">
        <PersonalProjectItem 
          v-for="project in personalProjects" 
          :key="project.id"
          :project="project"
        />
      </ul>
    </div>
  </section>
</template>

<script setup>
import PersonalProjectItem from '~/components/PersonalProjectItem.vue';

defineProps({
  personalProjects: {
    type: Array,
    default: () => [
      {
        id: 1,
        name: 'MOSCANELLAMM***A',
        url: 'https://www.instagram.com/moscanellammerda/',
        role: 'Digital Artist',
        period: '2013 > now',
        description: `Grazie ai miei studi alla <strong>Scuola Italiana di Comix</strong> sono diventato un creativo ed appassionato Digital Artist con esperienza nella progettazione e sviluppo di fumetti e personaggi originali. Ideatore di <strong>Moscanellamm***a</strong>, un progetto narrativo che esplora tematiche profonde e situazioni di vita reale con uno stile unico e crudo, arricchito da elementi poetici e simbolici. Abile nel trasformare emozioni complesse in arte visiva attraverso un uso evocativo del colore, del tratto e della composizione.`
      },
      {
        id: 2,
        name: 'STARCADE & IMAGINEED',
        url: 'https://www.joshuarte.it/overlordz',
        role: 'Founder',
        period: '2021 > now',
        description: `Siamo sviluppatori ed editori indipendenti di videogiochi e software, con sede a Napoli, in Italia, con una passione per i giochi 2D e il desiderio di supportare e creare giochi straordinari e altamente caratterizzati, nonchè advergame(videogiochi pubblicitari). Ho colto l'occasione per acquisire esperienza nello sviluppo e nella progettazione di videogiochi con alcuni colleghi. Il mio ruolo in questo progetto è rimbalzato dalla gestione del progetto al design del gioco, dallo sviluppo fino al marketing. Abbiamo pubblicato OverlordZ, un gioco di carte indie per dispositivi mobili e PC. <a href="https://imagineed.itch.io/overlordz" title="gioca ad overlordz" target="_blank">Puoi giocarlo qui!</a>`
      }
    ]
  }
});
</script>

<style lang="scss" scoped>
.job-list {
  list-style: none;
  padding: 0;
}
</style>