<template>
  <!-- Le icone sono gestite tramite useHead in script -->
</template>

<script setup>
useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/icons/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/icons/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/icons/favicon-16x16.png' },
    { rel: 'manifest', href: '/images/icons/site.webmanifest' },
    { rel: 'mask-icon', href: '/images/icons/safari-pinned-tab.svg', color: '#63c5e0' },
    { rel: 'shortcut icon', href: '/images/icons/favicon.ico' }
  ],
  meta: [
    { name: 'msapplication-TileColor', content: '#2d89ef' },
    { name: 'msapplication-config', content: '/images/icons/browserconfig.xml' },
    { name: 'theme-color', content: '#ffffff' }
  ]
});
</script> 