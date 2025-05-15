<template>
  <div class="profile">
    <img src="/images/mnm/avatar.jpg" alt="Profile Picture"/>
    <h1>MOSCANELLAMMERDA</h1>
    <p>
      La mia mosca non si nutre solo dimmerda, ma anche di <strong>idee</strong>!<br><br>
      Con il tuo contributo posso continuare a creare vignette che fanno emozionare e riflettere.
      <br>
      Ogni donazione mi permette di dedicare più <strong>tempo</strong> alla creazione di nuovi contenuti, investire in <strong>strumenti</strong> migliori e mantenere questo progetto <strong>libero e accessibile</strong> a tutti.
      <br><br>
      Se ti piace ciò che faccio e vuoi vedere ancora piùmmerda creativa, sostieni la mosca con <strong>un semplice caffè</strong>!
      <br>
      <br> Il tuo supporto è il carburante per questo viaggio artistico nellammerda!
    </p>
    <iframe id='kofiframe' src='https://ko-fi.com/moscanellammerda/?hidefeed=true&widget=true&embed=true&preview=true' style='background: transparent' height='712' title='moscanellammerda'></iframe>

    <hr>
    <p>Oppure seguimi su:</p>
    <ul class="links">
      <li>
        <a href="https://instagram.com/moscanellammerda" target="_blank">Instagram</a>
      </li>
      <li class="kofi-button">
        <!-- Il bottone Ko-Fi verrà inserito qui dal script -->
      </li>
    </ul>
  </div>
</template>

<script setup>
// Cambia il layout per questa pagina
definePageMeta({
  layout: 'mosca'
})

// Setup SEO per la pagina
useHead({
  title: 'MOSCANELLAMMERDA | Vignette & Design Creativo',
  meta: [
    { name: 'description', content: 'Portfolio di illustrazioni, vignette e design creativo di Luca Joshua Mosca, frontend developer e digital artist.' },
    { name: 'author', content: 'Luca Joshua Mosca' },
    { property: 'og:title', content: 'MOSCANELLAMMERDA | Illustrazioni & Design Creativo' },
    { property: 'og:description', content: 'Portfolio artistico di Luca Joshua Mosca, frontend developer e illustratore digitale. Vignette, concept art e design creativo.' },
    { property: 'og:url', content: 'https://www.joshuarte.it/moscanellammerda' },
    { property: 'og:image', content: 'https://www.joshuarte.it/images/bg.jpg' }
  ],
  script: [
    {
      children: `
        window.onload = function() {
          if (typeof kofiWidgetOverlay !== 'undefined') {
            kofiWidgetOverlay.draw('moscanellammerda', {
              'type': 'floating-chat',
              'floating-chat.donateButton.text': 'Support me',
              'floating-chat.donateButton.background-color': '#ff38b8',
              'floating-chat.donateButton.text-color': '#fff'
            });
          }
          
          if (document.querySelector('.kofi-button') && typeof kofiwidget2 !== 'undefined') {
            kofiwidget2.init('SUPPORTAMI SU KO-FI 💩', '#59b2c2', 'T6T11E8PYJ');
            kofiwidget2.draw();
          }
        }
      `
    }
  ]
})

// Carica gli script di Ko-Fi
onMounted(() => {
  const kofiWidgetScript = document.createElement('script')
  kofiWidgetScript.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'
  document.head.appendChild(kofiWidgetScript)
  
  const kofiButtonScript = document.createElement('script')
  kofiButtonScript.src = 'https://storage.ko-fi.com/cdn/widget/Widget_2.js'
  document.head.appendChild(kofiButtonScript)
})
</script>

<style scoped>
.profile {
  text-align: center;
  margin-bottom: 20px;
}

.profile img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
  border: 2px solid #ddd;
}

.profile h1 {
  margin: 5px 0;
  font-size: 1.5em;
  color: white;
}

.profile p {
  font-size: 1em;
  color: white;
  padding-left: 25px;
  padding-right: 25px;
  max-width: 900px;
  text-wrap: balance;
  margin: 0 auto;
}

hr {
  border: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  margin: 30px auto;
  width: 80%;
  max-width: 500px;
}

.links {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0;
  margin: 20px auto;
}

.links li {
  display: flex;
}

.links a {
  text-decoration: none;
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-size: 1em;
  transition: background-color 0.3s;
  min-width: 200px;
}

.links a:hover {
  background-color: #45a049;
}

#kofiframe {
  width: 100%;
  max-width: 600px;
  border: none;
  margin: 20px auto;
  display: block;
}
</style> 