# Refactoring del Portfolio - Documentazione

## Panoramica

Il progetto è stato completamente refactorizzato per migliorare l'organizzazione del codice, la manutenibilità e la riusabilità dei componenti.

## Struttura dei Componenti

### Componenti di Sezione (`/components/sections/`)

#### `HeroSection.vue`
- **Scopo**: Gestisce la sezione hero/header della homepage
- **Props**:
  - `introText`: Testo principale di introduzione
  - `description`: Descrizione aggiuntiva
  - `socialData`: Dati per i social media
  - `socialIconsLabel`: Etichetta per le icone social
  - `defaultIntroText`: Testo di fallback

#### `BioSection.vue`
- **Scopo**: Visualizza la sezione biografia
- **Props**:
  - `bioHeading`: Titolo della sezione bio
  - `bioContent`: Contenuto ricco da Prismic

#### `SkillsSection.vue`
- **Scopo**: Mostra le competenze tecniche
- **Props**:
  - `skills`: Array di oggetti skill con `title` e `technologies`

#### `WorkSection.vue`
- **Scopo**: Visualizza l'esperienza lavorativa
- **Props**:
  - `workExperience`: Array di esperienze lavorative
- **Componenti utilizzati**: `WorkExperienceItem.vue`

#### `PersonalProjectsSection.vue`
- **Scopo**: Mostra i progetti personali
- **Props**:
  - `personalProjects`: Array di progetti personali
- **Componenti utilizzati**: `PersonalProjectItem.vue`

#### `FooterSection.vue`
- **Scopo**: Footer del sito
- **Props**:
  - `startYear`: Anno di inizio (default: 2010)
  - `logoWidth`: Larghezza del logo (default: 100)

### Componenti di Elemento

#### `WorkExperienceItem.vue`
- **Scopo**: Singolo elemento di esperienza lavorativa
- **Props**:
  - `company`: Nome dell'azienda
  - `position`: Posizione ricoperta
  - `period`: Periodo di lavoro
  - `description`: Descrizione del ruolo
  - `url`: URL dell'azienda (opzionale)

#### `PersonalProjectItem.vue`
- **Scopo**: Singolo progetto personale
- **Props**:
  - `project`: Oggetto con `name`, `role`, `period`, `description`, `url`

#### `RecentProjectsButton.vue`
- **Scopo**: Pulsante per mostrare i progetti recenti
- **Props**:
  - `buttonText`: Testo del pulsante (default: "PROGETTI RECENTI")
  - `ariaLabel`: Etichetta per accessibilità
- **Eventi**: `toggle-portfolio`

## Configurazione Centralizzata

### `/data/portfolio.js`

File di configurazione che centralizza tutti i dati statici:

- **`skills`**: Array delle competenze tecniche
- **`workExperience`**: Array delle esperienze lavorative
- **`personalProjects`**: Array dei progetti personali
- **`socialData`**: Oggetto con i dati dei social media

## Vantaggi del Refactoring

### 1. **Separazione delle Responsabilità**
- Ogni componente ha una responsabilità specifica
- Codice più leggibile e manutenibile

### 2. **Riusabilità**
- I componenti possono essere riutilizzati in altre pagine
- Facile personalizzazione tramite props

### 3. **Centralizzazione dei Dati**
- Tutti i dati statici sono in un unico file
- Facile aggiornamento delle informazioni

### 4. **Manutenibilità**
- Modifiche isolate ai singoli componenti
- Struttura più chiara del progetto

### 5. **Testabilità**
- Ogni componente può essere testato individualmente
- Props ben definite facilitano i test

## Come Aggiungere Nuovi Contenuti

### Aggiungere una Nuova Skill
```javascript
// In /data/portfolio.js
export const skills = [
  // ... skills esistenti
  {
    id: 7,
    title: 'Nuova Competenza',
    technologies: 'Tecnologie utilizzate'
  }
];
```

### Aggiungere una Nuova Esperienza Lavorativa
```javascript
// In /data/portfolio.js
export const workExperience = [
  // ... esperienze esistenti
  {
    id: 5,
    company: 'NUOVA AZIENDA',
    url: 'https://www.nuovaazienda.com',
    position: 'Ruolo',
    period: '2024 > now',
    description: 'Descrizione del ruolo...'
  }
];
```

### Aggiungere un Nuovo Progetto Personale
```javascript
// In /data/portfolio.js
export const personalProjects = [
  // ... progetti esistenti
  {
    id: 3,
    name: 'NUOVO PROGETTO',
    url: 'https://www.nuovoprogetto.com',
    role: 'Ruolo nel progetto',
    period: '2024 > now',
    description: 'Descrizione del progetto...'
  }
];
```

## Struttura File

```
components/
├── sections/
│   ├── HeroSection.vue
│   ├── BioSection.vue
│   ├── SkillsSection.vue
│   ├── WorkSection.vue
│   ├── PersonalProjectsSection.vue
│   └── FooterSection.vue
├── WorkExperienceItem.vue
├── PersonalProjectItem.vue
├── RecentProjectsButton.vue
└── SocialIcons.vue (esistente)

data/
└── portfolio.js

pages/
└── index.vue (refactorizzato)
```

## Gestione delle Immagini Prismic

### `PrismicImageWrapper.vue`

Componente wrapper per gestire le immagini di Prismic con fallback automatico:

```vue
<PrismicImageWrapper 
  :field="prismicImageField"
  alt="Descrizione immagine"
  :fallback-src="'/path/to/fallback.jpg'"
  image-class="custom-image-class"
  :loading="'lazy'"
/>
```

**Props disponibili:**
- `field`: Campo immagine di Prismic
- `alt`: Testo alternativo
- `imageClass`: Classi CSS da applicare
- `fallbackSrc`: Immagine di fallback
- `showPlaceholder`: Mostra placeholder se nessuna immagine
- `placeholderText`: Testo del placeholder
- `loading`: Attributo loading ('lazy' o 'eager')

### Utilizzo nelle Slice

**Home Slice** - Hero Image:
```vue
<PrismicImage 
  :field="slice.primary.hero_image" 
  :alt="slice.primary.intro_title || 'Hero Image'"
  class="hero-img"
/>
```

**Project Slice** - ImageUrl:
```vue
<PrismicImage 
  :field="slice.primary.imageurl" 
  :alt="slice.primary.name || 'Progetto'"
  class="project-img"
/>
```

## Note per lo Sviluppo

- Tutti i componenti utilizzano la sintassi Composition API di Vue 3
- I dati da Prismic continuano a funzionare come prima
- I dati statici sono ora centralizzati e facilmente modificabili
- Le immagini utilizzano ora il componente PrismicImage per ottimizzazione automatica
- La struttura è scalabile per future aggiunte