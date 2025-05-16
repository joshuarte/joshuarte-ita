<template>
  <div class="main-container">
    <!-- <header>
      <div class="container header-inner">
        <div class="logo">
          <NuxtLink to="/">Joshua Rte.</NuxtLink>
        </div>
        <nav>
          <ul>
            <li><NuxtLink to="/" exact-active-class="active">Home</NuxtLink></li>
            <li><NuxtLink to="/blog" active-class="active">Blog</NuxtLink></li>
            <li><NuxtLink to="/progetti" active-class="active">Progetti</NuxtLink></li>
            <li><NuxtLink to="/contatti" active-class="active">Contatti</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </header>-->
    <header class="inner left text-center">
      <h1 class="h2"
          v-if="homeData && homeData.intro_text">{{ homeData.intro_text }}</h1>
      <h1 class="h2"
          v-else>Sviluppatore web e designer con una passione per l'innovazione e la creatività.</h1>
      <p>
        Dimentica le agenzie che ti trattano come un numero: sviluppo web artigianale con dedizione totale al tuo
        progetto.
      </p>
      <nav class="btn-transition-alt"
           aria-label="Contatti principali">
        <a :href="`mailto:${social.mail}`"
           data-hover="RACCONTAMI DEL TUO PROGETTO"
           aria-label="Invia un'email">
          <span>RACCONTAMI DEL TUO PROGETTO</span>
        </a>
      </nav>
      <p>Oppure scrivimi su:</p>
      <SocialIcons ariaLabel="Social media" />
    </header>
    <div class="inner right"
         :class="portfolioPanelClass"
         id="right">
      <div class="content">
        <div class="row">
          <div class="col-sm-10 offset-sm-2 module-notop">
            <LogoJoshuarte width="281.12"
                           height="100.938" />
          </div>
        </div>
        <div class="scrolling-content-wrapper">
          <div class="scrolling-content">
            <!-- BIO -->
            <section class="row module__bottom"
                     aria-labelledby="bio-heading">
              <div class="col-sm-2">
                <h2 id="bio-heading"
                    class="section-heading">{{ homeData.bio_heading }}</h2>
              </div>
              <div class="col-sm-10">
                <PrismicRichText :field="homeData.bio_content" />
              </div>
            </section>
            <!-- SKILLS -->
            <section class="row module__bottom"
                     aria-labelledby="skills-heading">
              <div class="col-sm-2">
                <h2 id="skills-heading"
                    class="section-heading">&lt;skills/&gt;</h2>
              </div>
              <div class="col-sm-10">
                <ul class="skills-list">
                  <li>
                    <p>
                      <b>Sviluppo Web</b> (MEVNstack, Wordpress)
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>GUI / UI / UX</b> (Figma)
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Design & Sviluppo Giochi</b> (Game maker studio 2)
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Design & Sviluppo Giochi Pubblicitari</b> (GDevelop)
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Design Assets di Gioco</b> (Procreate Dreams)
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Gestione progetti / Consulenza IT</b> (Jira / Trello)
                    </p>
                  </li>
                </ul>
              </div>
            </section>
            <!-- WORK -->
            <section class="row module__bottom"
                     aria-labelledby="work-heading">
              <div class="col-sm-2">
                <h2 id="work-heading"
                    class="section-heading">&lt;work/&gt;</h2>
              </div>
              <div class="col-sm-10">
                <ul class="job-list">
                  <li>
                    <p>
                      <a href="https://www.ciaopeople.it/"
                         title="ciaopeople"
                         target="_blank"
                         rel="noopener">
                        <strong>CIAOPEOPLE</strong>
                      </a>
                    </p>
                    <p>
                      <strong>Frontend & Software Developer</strong> - 2022 > now
                    </p>
                    <p>
                      Attualmente, contribuisco allo sviluppo e
                      all'ottimizzazione delle piattaforme digitali Design System Maintainer, garantendo l'efficienza e
                      la
                      coerenza dei componenti
                      UI attraverso un design system strutturato e scalabile. Mi occupo inoltre di sviluppo software e
                      di
                      ottimizzazione delle performance e dell'accessibilità generale, assicurando un'esperienza utente
                      fluida e performante.
                      <br />
                      <br />Ciaopeople è un gruppo editoriale digitale tra i più influenti in Italia, proprietario di
                      testate
                      come
                      <strong>Fanpage.it, Ohga e Cookist</strong>. L'azienda è leader nella produzione di contenuti
                      digitali di alta
                      qualità, con un focus su informazione, intrattenimento e lifestyle, raggiungendo milioni di utenti
                      ogni giorno attraverso piattaforme web e social.
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="https://we-rad.com/"
                         title="werad"
                         target="_blank"
                         rel="noopener">
                        <strong>WE RAD</strong>
                      </a>
                    </p>
                    <p>
                      <strong>Lead Frontend Developer</strong> - 2019 > 2020
                    </p>
                    <p>
                      Il ruolo che ho ricoperto in questa azienda mi ha permesso di
                      gestire e definire soluzioni ottimali in alcuni progetti in base
                      alle esigenze di business, oltre a comprendere meglio le
                      responsabilità e le criticità durante le fasi di sviluppo e
                      progettazione. Ho guidato anche il team di frontend nella realizzazione di vari progetti.
                      <br />
                      <br />WE
                      RAD è un'agenzia di comunicazione con sede a Firenze, specializzata
                      nell'integrazione di strategie digitali e analogiche per la creazione di esperienze di marca
                      autentiche e coinvolgenti.
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="https://www.bluelabs.it/"
                         title="bluelabs"
                         target="_blank"
                         rel="noopener">
                        <strong>BLUELABS</strong>
                      </a>
                    </p>
                    <p>
                      <strong>Frontend Developer</strong> - 2017 > 2019
                    </p>
                    <p>
                      Il mio ruolo presso l'azienda ricopriva attività di
                      sviluppo frontend per web app e landing pages basate su Vue2 e Webpack,
                      manutenzione e l'implementazione di nuove features su progetti
                      esistenti con particolare attenzione alla creazione di pagine di donazione efficaci. Bluelabs è
                      un'agenzia creativa indipendente con sede a Napoli, specializzata nella realizzazione di
                      progetti di comunicazione digitale innovativi e sfidanti.
                      <br />
                      <br />Bluelabs ha un forte impegno verso
                      le
                      organizzazioni non profit (ONLUS), si è specializzata nel design e nello sviluppo di piattaforme
                      digitali che facilitano le donazioni online, ottimizzando l'esperienza dell'utente per
                      massimizzare la
                      partecipazione e il sostegno alle cause sociali. Le sue soluzioni si sono rivelate fondamentali
                      per
                      ONG come Greenpeace, WWF, Telethon e Medici Senza Frontiere, creando pagine che non solo
                      facilitano la
                      raccolta fondi, ma sensibilizzano anche il pubblico sull'importanza di sostenere tali iniziative.
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="https://www.emmemedia.com"
                         title="emmemedia"
                         target="_blank"
                         rel="noopener">
                        <strong>EMMEMEDIA</strong>
                      </a>
                    </p>
                    <p>
                      <strong>Frontend Developer</strong> - 2013 > 2017
                    </p>
                    <p>
                      Nella mia esperienza di lavoro con questa azienda ho lavorato su
                      innumerevoli progetti che mi hanno permesso di comprendere
                      meglio la validazione del W3C e il modello HTML orientato alla
                      SEO. Tutti i siti Web sono stati realizzati con HTML
                      personalizzato, jQuery / vanilla JS e Sass.
                      <br />
                      <br />Emmemedia è una performance agency con sedi a Milano, Roma, e Napoli, specializzata nel
                      miglioramento
                      delle performance digitali dei brand attraverso strategie mirate e misurabili.
                    </p>
                  </li>
                </ul>
              </div>
            </section>
            <section class="row"
                     aria-labelledby="hobby-heading">
              <div class="col-sm-2">
                <h2 id="hobby-heading"
                    class="section-heading">
                  &lt;personal &lt;br/&gt;
                  <br />projects/&gt;
                </h2>
              </div>
              <div class="col-sm-10">
                <ul class="job-list">
                  <li>
                    <p>
                      <a href="https://www.instagram.com/moscanellammerda/"
                         title="moscanellammerda digital artist"
                         target="_blank"
                         rel="noopener">
                        <strong>MOSCANELLAMM***A</strong>
                      </a>
                    </p>
                    <p>
                      <strong>Digital Artist</strong> - 2013 > now
                    </p>
                    <p>
                      Grazie ai miei studi alla
                      <strong>Scuola Italiana di Comix</strong> sono diventato un creativo ed
                      appassionato Digital Artist con esperienza nella progettazione e sviluppo di fumetti e
                      personaggi originali. Ideatore di
                      <strong>Moscanellamm***a</strong>, un progetto narrativo che esplora
                      tematiche profonde e situazioni di vita reale con uno stile unico e crudo, arricchito da elementi
                      poetici e simbolici. Abile nel trasformare emozioni complesse in arte visiva attraverso un uso
                      evocativo del colore, del tratto e della composizione. .
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="https://www.joshuarte.it/overlordz"
                         title="imagineed starcade videogame development"
                         target="_blank"
                         rel="noopener">
                        <strong>STARCADE & IMAGINEED</strong>
                      </a>
                    </p>
                    <p>
                      <strong>Founder</strong> - 2021 > now
                    </p>
                    <p>
                      Siamo sviluppatori ed editori indipendenti di videogiochi e software, con sede a Napoli, in
                      Italia,
                      con
                      una passione per i giochi 2D e il desiderio di supportare e creare giochi straordinari e altamente
                      caratterizzati, nonchè advergame(videogiochi pubblicitari). Ho colto l'occasione per acquisire
                      esperienza nello sviluppo e
                      nella progettazione di videogiochi con alcuni colleghi. Il mio ruolo
                      in questo progetto è rimbalzato dalla gestione del progetto al
                      design del gioco, dallo sviluppo fino al marketing. Abbiamo
                      pubblicato OverlordZ, un gioco di carte indie per dispositivi
                      mobili e PC.
                      <a href="https://imagineed.itch.io/overlordz"
                         title="gioca ad overlordz"
                         target="_blank">Puoi giocarlo qui!</a>
                    </p>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-8 offset-sm-2">
            <nav class="btn-transition d-none d-sm-block">
              <a href="#"
                 id="show-portfolio"
                 data-hover="PROGETTI RECENTI"
                 @click.prevent="togglePortfolioPanel"
                 aria-label="Visualizza i lavori recenti">
                <span>PROGETTI RECENTI</span>
              </a>
            </nav>
          </div>
        </div>

        <footer class="row">
          <div class="col-sm-10 offset-sm-2">
            <p class="h-align-left">
              <a href="#"
                 data-module="modalToggle">
                <strong>privacy</strong>
              </a>
              &nbsp; | &copy; 2010-{{ new Date().getFullYear() }} - &nbsp;
              <LogoLJM width="100" />
            </p>
          </div>
        </footer>
      </div>
    </div>


    <div class="main-container right 	d-block d-sm-none">
      <div class="content">
        <h3 class="	d-block d-sm-none">&lt;recent projects/&gt;</h3>
      </div>
    </div>
    <!-- Aggiungiamo il panel gestito dallo store -->
    <PortfolioPanel :projects="projects" />
    <!-- La sezione right-portfolio è stata spostata nel componente PortfolioPanel -->

    <!-- {% include "shared/privacy.html" %} -->

    <!-- v-if="homeData && homeData.intro_description" 

          v-if="homeData && homeData.intro_button"
    :href="homeData.intro_button.url || '#'"-->



    <!-- Recent Blog Posts -->
    <!-- <section id="blog" class="blog-section">
      <div class="container">
        <h2>Articoli Recenti</h2>
        <RecentPosts :limit="3" />
        <div class="view-all">
          <NuxtLink to="/blog" class="btn btn-outline">Vedi tutti gli articoli</NuxtLink>
        </div>
      </div>
    </section>-->
  </div>
</template>

<script setup>
// Import dei componenti SVG
import LogoJoshuarte from '~/components/icons/LogoJoshuarte.vue';
import LogoLJM from '~/components/icons/LogoLJM.vue';
import SocialIcons from '~/components/SocialIcons.vue';
import { usePortfolioPanel } from '~/composables/usePortfolioPanel';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

// SEO metadata
useHead({
  title: 'JOSHUARTE | Frontend Developer & UI/UX Designer',
  meta: [
    {
      name: 'description',
      content: 'Senior Frontend Developer & UI/UX Designer specializzato in JavaScript, React, Vue.js, Web Performance e Accessibilità. Portfolio di progetti web e game development.'
    }
  ]
});

// Dati social globali
const social = inject('social', {
  mail: 'joshuarte@gmail.com',
  discord: 'https://discordapp.com/channels/@joshuarte',
  linkedin: 'https://it.linkedin.com/in/joshuarte'
});

// Utilizziamo il client Prismic per ottenere i dati
const prismic = usePrismic();

// Fetch Home data using the appropriate query based on the API response
const { data: homeDoc, pending: isHomeLoading, error: homeError } = useAsyncData('home', async () => {
  try {
    return await prismic.client.getSingle('home');
  } catch (e) {
    console.error('Error fetching home document:', e);
    return null;
  }
});

// Process home data to extract content from slices
const homeData = computed(() => {
  if (!homeDoc.value || !homeDoc.value.data) return null;

  // Extract data from slices if present
  if (homeDoc.value.data.slices && homeDoc.value.data.slices.length > 0) {
    const homeSlice = homeDoc.value.data.slices.find(slice => slice.slice_type === 'home');
    if (homeSlice && homeSlice.primary) {
      return {
        intro_text: homeSlice.primary.intro_text || '',
        bio_heading: homeSlice.primary.bio_heading,
        bio_content: homeSlice.primary.bio_content,
        intro_description: homeSlice.primary.intro_description?.[0]?.text || '',
        intro_button: homeSlice.primary.intro_button || null
      };
    }
  }

  // Otherwise use direct document data
  return {
    intro_text: homeDoc.value.data.intro_text || '',
    intro_description: homeDoc.value.data.intro_description?.[0]?.text || '',
    intro_button: homeDoc.value.data.intro_button || null
  };
});

// Fetch projects data
const { data: projectDocs, pending: isProjectsLoading, error: projectsError } = useAsyncData('projects', async () => {
  try {
    return await prismic.client.getAllByType('projects');
  } catch (e) {
    console.error('Error fetching projects:', e);
    return [];
  }
});

// Process projects data to extract from slices
const projects = computed(() => {
  if (!projectDocs.value || !Array.isArray(projectDocs.value)) return [];

  return projectDocs.value.flatMap(doc => {
    if (!doc.data?.slices || !Array.isArray(doc.data.slices)) {
      return [];
    }

    return doc.data.slices
      .filter(slice => slice.slice_type === 'project')
      .map((slice, index) => {
        const primary = slice.primary || {};

        return {
          uid: doc.uid || `project-${index}`,
          name: primary.name || 'Progetto senza nome',
          image: primary.imageurl || null,
          imageUrl: primary.imageurl?.url || '/placeholder-project.jpg',
          jobDescription: primary.jobdescription || 'Descrizione non disponibile',
          url: primary.url || '#'
        };
      });
  });
});

// Utilizzo dello store per il pannello portfolio
const portfolioPanel = usePortfolioPanel();
const { isVisible } = storeToRefs(portfolioPanel);

// Calcola dinamicamente la classe del pannello
const portfolioPanelClass = computed(() => {
  return isVisible.value ? 'slideOutRight' : '';
});

// Funzione per attivare/disattivare il pannello portfolio
const togglePortfolioPanel = () => {
  portfolioPanel.toggle();
};
</script>

<style lang="scss" scoped>
// Rimosso stile non utilizzato
</style>