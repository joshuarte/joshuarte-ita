<template>
  <div>
    <header>
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
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <div class="container footer-inner">
        <div class="footer-col">
          <h3>Joshua Rte.</h3>
          <p>Sviluppatore web e designer con una passione per l'innovazione e la creatività.</p>
        </div>
        <div class="footer-col">
          <h3>Link Rapidi</h3>
          <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/blog">Blog</NuxtLink></li>
            <li><NuxtLink to="/progetti">Progetti</NuxtLink></li>
            <li><NuxtLink to="/contatti">Contatti</NuxtLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Contatti</h3>
          <ul>
            <li>Email: info@joshuarte.it</li>
            <li>Telefono: +39 123 456 7890</li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        <div class="container">
          <p>&copy; {{ new Date().getFullYear() }} Joshua Rte. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Layout principale predefinito
</script> 