# Nuxt Blog con Prismic CMS

Un blog basato su Nuxt 3 e Prismic CMS per il sito JOSHUARTE/moscanellammerda.

## Funzionalità

- 🚀 Nuxt 3 con Vue 3 e TypeScript
- 📝 Prismic CMS per la gestione dei contenuti
- 🏷️ Supporto per blog post, tag e categorie
- 🔍 SEO ottimizzato per tutti i contenuti
- 🌐 Compatibilità con l'attuale struttura del sito
- 📱 Design mobile-first e completamente responsive

## Setup

### Prerequisiti

- Node.js 16.x o superiore
- NPM o Yarn

### Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Genera il sito statico
npm run generate

# Visualizza in anteprima la build
npm run preview
```

## Struttura del progetto

```
nuxt-blog/
├── assets/            # File SCSS, immagini, ecc.
├── components/        # Componenti Vue riutilizzabili
├── layouts/           # Layout del sito
├── pages/             # Pagine del sito (routing automatico)
├── plugins/           # Plugin (Prismic, ecc.)
├── public/            # File statici
└── types/             # Definizioni TypeScript
```

## Gestione contenuti con Prismic

### Setup su Prismic.io

1. Crea un repository su [Prismic.io](https://prismic.io)
2. Configura i Custom Types per:
   - `blog_post` - Articoli del blog
   - `page` - Pagine generiche

### Blog Post Custom Type

Esempio di struttura consigliata:

- **UID**: `uid` - Identificativo unico nell'URL
- **Title**: `title` - Titolo dell'articolo (testo singolo)
- **Description**: `description` - Meta description e anteprima (testo singolo)
- **Author**: `author` - Nome dell'autore (testo singolo)
- **Featured Image**: `featured_image` - Immagine principale (immagine)
- **Content**: `content` - Contenuto principale (rich text)
- **Tags**: `tags` - Tag dell'articolo (gruppo con campi testo)

## Deployment

Per effettuare il deployment del sito:

```bash
# Genera i file statici
npm run generate

# I file generati saranno nella cartella 'dist'
# Caricali sul server via FTP o altro metodo
```

## Nuovi articoli

Per creare nuovi articoli:

1. Accedi al dashboard di Prismic
2. Crea un nuovo documento di tipo 'Blog Post'
3. Compila tutti i campi richiesti
4. Pubblica l'articolo
5. Il nuovo articolo sarà disponibile su `/blog/[uid]`

## Integrazioni

Il progetto mantiene compatibilità con:

- Google Analytics
- Open Graph e Twitter Cards
- Ko-Fi per donazioni
- Collegamenti alle pagine esistenti 