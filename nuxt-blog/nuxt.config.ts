// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: "it",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { name: "google-adsense-account", content: "ca-pub-7716592172266156" },
        { name: "description", content: "" }, // Verrà sovrascritta nelle singole pagine
        { name: "author", content: "" }, // Verrà sovrascritta nelle singole pagine
        // Open Graph di default - verranno sovrascritti nelle singole pagine
        { property: "og:title", content: "" },
        { property: "og:description", content: "" },
        { property: "og:url", content: "" },
        { property: "og:image", content: "" },
        { property: "og:type", content: "website" },
        // Twitter Card di default - verranno sovrascritti nelle singole pagine
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "" },
        { name: "twitter:description", content: "" },
        { name: "twitter:image", content: "" },
      ],
      link: [
        // Canonical URL
        { rel: "canonical", href: "https://www.joshuarte.it" },
        // Preload strategico delle immagini per LCP
        {
          rel: "preload",
          as: "image",
          imagesrcset: "/images/bg.avif",
          type: "image/avif",
          fetchpriority: "high",
        },
        {
          rel: "preload",
          as: "image",
          imagesrcset: "/images/bg.webp",
          type: "image/webp",
          fetchpriority: "high",
        },
        {
          rel: "preload",
          as: "image",
          href: "/images/bg.jpg",
          fetchpriority: "high",
        },
        // Font loading ottimizzato
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "style",
          href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600&display=swap",
          media: "print",
          onload: "this.media='all'",
        },
      ],
      script: [
        // Structured Data
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Luca Joshua Mosca",
            url: "https://www.joshuarte.it",
            jobTitle: "Senior Developer e Game Designer",
            knowsAbout: [
              "Frontend Development",
              "Game Design",
              "UI/UX",
              "Web Development",
            ],
            sameAs: [
              "https://discordapp.com/channels/@joshuarte",
              "https://it.linkedin.com/in/joshuarte",
            ],
          }),
        },
        // Google Analytics
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-W7H28M8MDY",
          defer: true,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag("js", new Date());
            gtag("config", "G-W7H28M8MDY");
          `,
        },
        // AdSense
        {
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7716592172266156",
          defer: true,
          crossorigin: "anonymous",
        },
        // Ko-Fi Widget
        { src: "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js" },
        {
          innerHTML: `
            kofiWidgetOverlay.draw('moscanellammerda', {
              'type': 'floating-chat',
              'floating-chat.donateButton.text': 'Support me',
              'floating-chat.donateButton.background-color': '#ff38b8',
              'floating-chat.donateButton.text-color': '#fff'
            });
          `,
        },
      ],
      style: [
        {
          // Stile inline per font fallback
          innerHTML: `
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 300;
              font-display: swap;
              src: local('Source Sans Pro Light'), local('SourceSansPro-Light');
            }
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular');
            }
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 600;
              font-display: swap;
              src: local('Source Sans Pro SemiBold'), local('SourceSansPro-SemiBold');
            }
          `,
        },
      ],
    },
  },

  css: [
    "@/assets/stylesheets/critical.scss", // Stili critici caricati per primi
    "@/assets/stylesheets/app.scss",
  ],

  modules: [
    "@nuxtjs/prismic",
    "@pinia/nuxt"
  ],

  // Configurazione per SASS - importiamo le variabili in tutti i componenti
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/assets/stylesheets/utilities/variables.scss";',
        },
      },
    },
  },

  // Prismic configuration
  prismic: {
    endpoint: "joshuarte",
    clientConfig: {
      // Add access token if you have a private repository
      // accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      routes: [
        {
          type: "home",
          path: "/",
        },
        {
          type: "projects",
          path: "/progetti/:uid",
        },
        {
          type: "articles",
          path: "/blog/:uid",
        },
      ],
    },
  },

  // Transpila i pacchetti necessari
  build: {
    transpile: ["@prismicio/client"],
  },

  // Aggiungo la data di compatibilità per Nitro
  nitro: {
    compatibilityDate: "2025-05-15",
  },
});
