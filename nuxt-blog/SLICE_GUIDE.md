# Guida alle Slice di Prismic

Questa guida spiega come utilizzare le nuove slice create per gestire i contenuti del portfolio tramite Prismic CMS.

## Slice Disponibili

### 1. Skills Slice
**ID**: `skills`  
**Descrizione**: Gestisce la sezione delle competenze tecniche

#### Campi:
- **Primary**:
  - `skills_heading` (Text): Titolo della sezione (default: "<skills/>")
- **Items** (Ripetibili):
  - `skill_title` (Text): Nome della competenza
  - `skill_technologies` (Text): Tecnologie utilizzate

#### Utilizzo:
1. Vai su Prismic Dashboard
2. Crea/modifica un documento
3. Aggiungi una slice "Skills"
4. Compila il titolo della sezione
5. Aggiungi gli elementi delle competenze

---

### 2. Work Experience Slice
**ID**: `work_experience`  
**Descrizione**: Gestisce la sezione delle esperienze lavorative

#### Campi:
- **Primary**:
  - `work_heading` (Text): Titolo della sezione (default: "<work/>")
- **Items** (Ripetibili):
  - `company_name` (Text): Nome dell'azienda
  - `company_url` (Link): URL dell'azienda
  - `position` (Text): Posizione ricoperta
  - `period` (Text): Periodo di lavoro
  - `description` (Rich Text): Descrizione dettagliata del ruolo

#### Utilizzo:
1. Vai su Prismic Dashboard
2. Crea/modifica un documento
3. Aggiungi una slice "WorkExperience"
4. Compila il titolo della sezione
5. Aggiungi le esperienze lavorative con tutti i dettagli

---

### 3. Personal Projects Slice
**ID**: `personal_projects`  
**Descrizione**: Gestisce la sezione dei progetti personali

#### Campi:
- **Primary**:
  - `projects_heading` (Text): Titolo della sezione (default: "<personal_projects/>")
- **Items** (Ripetibili):
  - `project_name` (Text): Nome del progetto
  - `project_url` (Link): URL del progetto
  - `project_role` (Text): Ruolo nel progetto
  - `project_period` (Text): Periodo del progetto
  - `project_description` (Rich Text): Descrizione dettagliata del progetto

#### Utilizzo:
1. Vai su Prismic Dashboard
2. Crea/modifica un documento
3. Aggiungi una slice "PersonalProjects"
4. Compila il titolo della sezione
5. Aggiungi i progetti personali con tutti i dettagli

---

## Migrazione dai Dati Statici

### Prima (portfolio.js)
I dati erano gestiti staticamente nel file `data/portfolio.js`:

```javascript
export const skills = [
  {
    id: 1,
    title: 'Sviluppo Web',
    technologies: 'MEVNstack, Wordpress'
  },
  // ...
];
```

### Dopo (Prismic Slice)
Ora i dati sono gestiti dinamicamente tramite Prismic CMS:

1. **Flessibilità**: Modifica i contenuti senza toccare il codice
2. **Gestione Centralizzata**: Tutti i contenuti in un unico CMS
3. **Versioning**: Storico delle modifiche
4. **Preview**: Anteprima delle modifiche prima della pubblicazione

---

## Come Aggiungere le Slice a un Documento

### 1. Accedi a Prismic Dashboard
- Vai su [prismic.io](https://prismic.io)
- Accedi al tuo repository

### 2. Modifica/Crea un Documento
- Seleziona il documento da modificare (es. Home)
- Oppure crea un nuovo documento

### 3. Aggiungi le Slice
- Clicca su "Add Slice"
- Seleziona la slice desiderata:
  - Skills
  - WorkExperience
  - PersonalProjects

### 4. Compila i Campi
- Riempi tutti i campi richiesti
- Utilizza Rich Text per descrizioni formattate
- Aggiungi link esterni dove necessario

### 5. Salva e Pubblica
- Salva le modifiche
- Pubblica il documento per renderlo visibile

---

## Vantaggi delle Slice

### 1. **Modularità**
- Ogni sezione è un componente indipendente
- Riutilizzabile in diversi documenti
- Facile manutenzione

### 2. **Flessibilità**
- Ordine delle sezioni modificabile
- Contenuti dinamici
- Facile aggiunta/rimozione di elementi

### 3. **Gestione Contenuti**
- Interfaccia user-friendly
- Non serve conoscenza tecnica
- Modifiche in tempo reale

### 4. **SEO e Performance**
- Contenuti ottimizzati per SEO
- Caricamento efficiente
- Gestione automatica delle immagini

---

## Struttura File

```
slices/
├── Skills/
│   ├── index.vue          # Componente Vue
│   ├── model.json         # Definizione campi
│   └── mocks.json         # Dati di esempio
├── WorkExperience/
│   ├── index.vue
│   ├── model.json
│   └── mocks.json
├── PersonalProjects/
│   ├── index.vue
│   ├── model.json
│   └── mocks.json
└── index.ts               # Registrazione slice
```

---

## Prossimi Passi

1. **Configura Slice Machine**: Utilizza `npm run slicemachine` per gestire le slice
2. **Sincronizza con Prismic**: Pusha le slice sul repository Prismic
3. **Crea Contenuti**: Aggiungi i contenuti tramite Prismic Dashboard
4. **Testa**: Verifica che tutto funzioni correttamente

---

## Comandi Utili

```bash
# Avvia Slice Machine
npm run slicemachine

# Avvia dev server + Slice Machine
npm run sm:dev

# Avvia solo il dev server
npm run dev
```

---

## Note Importanti

- Le slice sono **condivise** tra tutti i documenti
- I campi **Rich Text** supportano formattazione avanzata
- I **Link** possono essere interni o esterni
- Le modifiche richiedono **pubblicazione** per essere visibili
- Utilizza i **mock data** per testare durante lo sviluppo