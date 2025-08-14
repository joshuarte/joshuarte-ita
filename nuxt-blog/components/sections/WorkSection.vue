<template>
  <section class="row module__bottom" aria-labelledby="work-heading">
    <div class="col-sm-2">
      <h2 id="work-heading" class="section-heading">&lt;work/&gt;</h2>
    </div>
    <div class="col-sm-10">
      <ul class="job-list">
        <WorkExperienceItem 
          v-for="job in workExperience" 
          :key="job.id"
          :job="job"
        />
      </ul>
    </div>
  </section>
</template>

<script setup>
import WorkExperienceItem from '~/components/WorkExperienceItem.vue';

defineProps({
  workExperience: {
    type: Array,
    default: () => [
      {
        id: 1,
        company: 'CIAOPEOPLE',
        url: 'https://www.ciaopeople.it/',
        position: 'Frontend & Software Developer',
        period: '2022 > now',
        description: `Attualmente, contribuisco allo sviluppo e all'ottimizzazione delle piattaforme digitali Design System Maintainer, garantendo l'efficienza e la coerenza dei componenti UI attraverso un design system strutturato e scalabile. Mi occupo inoltre di sviluppo software e di ottimizzazione delle performance e dell'accessibilità generale, assicurando un'esperienza utente fluida e performante.<br/><br/>Ciaopeople è un gruppo editoriale digitale tra i più influenti in Italia, proprietario di testate come <strong>Fanpage.it, Ohga e Cookist</strong>. L'azienda è leader nella produzione di contenuti digitali di alta qualità, con un focus su informazione, intrattenimento e lifestyle, raggiungendo milioni di utenti ogni giorno attraverso piattaforme web e social.`
      },
      {
        id: 2,
        company: 'WE RAD',
        url: 'https://we-rad.com/',
        position: 'Lead Frontend Developer',
        period: '2019 > 2020',
        description: `Il ruolo che ho ricoperto in questa azienda mi ha permesso di gestire e definire soluzioni ottimali in alcuni progetti in base alle esigenze di business, oltre a comprendere meglio le responsabilità e le criticità durante le fasi di sviluppo e progettazione. Ho guidato anche il team di frontend nella realizzazione di vari progetti.<br/><br/>WE RAD è un'agenzia di comunicazione con sede a Firenze, specializzata nell'integrazione di strategie digitali e analogiche per la creazione di esperienze di marca autentiche e coinvolgenti.`
      },
      {
        id: 3,
        company: 'BLUELABS',
        url: 'https://www.bluelabs.it/',
        position: 'Frontend Developer',
        period: '2017 > 2019',
        description: `Il mio ruolo presso l'azienda ricopriva attività di sviluppo frontend per web app e landing pages basate su Vue2 e Webpack, manutenzione e l'implementazione di nuove features su progetti esistenti con particolare attenzione alla creazione di pagine di donazione efficaci. Bluelabs è un'agenzia creativa indipendente con sede a Napoli, specializzata nella realizzazione di progetti di comunicazione digitale innovativi e sfidanti.<br/><br/>Bluelabs ha un forte impegno verso le organizzazioni non profit (ONLUS), si è specializzata nel design e nello sviluppo di piattaforme digitali che facilitano le donazioni online, ottimizzando l'esperienza dell'utente per massimizzare la partecipazione e il sostegno alle cause sociali. Le sue soluzioni si sono rivelate fondamentali per ONG come Greenpeace, WWF, Telethon e Medici Senza Frontiere, creando pagine che non solo facilitano la raccolta fondi, ma sensibilizzano anche il pubblico sull'importanza di sostenere tali iniziative.`
      },
      {
        id: 4,
        company: 'EMMEMEDIA',
        url: 'https://www.emmemedia.com',
        position: 'Frontend Developer',
        period: '2013 > 2017',
        description: `Nella mia esperienza di lavoro con questa azienda ho lavorato su innumerevoli progetti che mi hanno permesso di comprendere meglio la validazione del W3C e il modello HTML orientato alla SEO. Tutti i siti Web sono stati realizzati con HTML personalizzato, jQuery / vanilla JS e Sass.<br/><br/>Emmemedia è una performance agency con sedi a Milano, Roma, e Napoli, specializzata nel miglioramento delle performance digitali dei brand attraverso strategie mirate e misurabili.`
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