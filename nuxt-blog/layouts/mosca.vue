<template>
  <div>
    <a class="back-to-home" href="https://www.joshuarte.it">TORNA ALLA HOME</a>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
// Layout per moscanellammerda
</script>

<style scoped>
.back-to-home {
  position: fixed;
  top: 15px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
  padding: 12px 24px;
  background-color: #59b2c2;
  color: #ff38b8;
  text-decoration: none;
  font-weight: bold;
  border-radius: 12px;
  z-index: 100;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  background: url("/images/mnm/bg.webp") repeat;
  background-size: 50%;
  background-color: pink;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 80px;
}

main {
  width: 100%;
  text-align: center;
  padding-top: 60px;
}
</style> 