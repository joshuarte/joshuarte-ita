<template>
  <div>
    <header>
      <div class="container header-inner">
        <div class="logo">
          <NuxtLink to="/">JOSHUARTE</NuxtLink>
        </div>
        <nav>
          <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/moscanellammerda">MoscaNellaMmerda</NuxtLink></li>
            <li><NuxtLink to="/blog">Blog</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <div class="container footer-inner">
        <div class="footer-col">
          <h3>Links</h3>
          <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/moscanellammerda">MoscaNellaMmerda</NuxtLink></li>
            <li><NuxtLink to="/blog">Blog</NuxtLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Social</h3>
          <ul>
            <li><a href="https://discordapp.com/channels/@joshuarte" target="_blank">Discord</a></li>
            <li><a href="https://it.linkedin.com/in/joshuarte" target="_blank">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/moscanellammerda/" target="_blank">Instagram</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Contatti</h3>
          <ul>
            <li><a href="mailto:joshuarte@gmail.com">joshuarte@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        &copy; {{ new Date().getFullYear() }} - Luca Joshua Mosca
      </div>
    </footer>
  </div>
</template>

<script setup>
// Layout predefinito dell'applicazione
</script> 