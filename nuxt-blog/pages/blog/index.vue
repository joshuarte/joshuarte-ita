<template>
  <div class="container">
    <div class="hero">
      <h1>Blog</h1>
      <p>Scopri le ultime notizie, vignette e progetti</p>
    </div>
    
    <div v-if="pending" class="loading">
      <p>Caricamento articoli...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>Si è verificato un errore nel caricamento dei contenuti.</p>
    </div>
    
    <div v-else class="blog-grid">
      <div v-for="post in posts" :key="post.id" class="blog-card">
        <NuxtLink :to="`/blog/${post.uid}`">
          <img 
            v-if="post.data.featured_image?.url" 
            :src="post.data.featured_image.url" 
            :alt="post.data.featured_image.alt || post.data.title"
          >
          <div class="blog-card-content">
            <h2>{{ post.data.title }}</h2>
            <p>{{ post.data.description }}</p>
            <span class="date">{{ formatDate(post.first_publication_date) }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
    
    <div v-if="posts && posts.length === 0" class="no-posts">
      <p>Nessun articolo pubblicato. Torna presto!</p>
    </div>
  </div>
</template>

<script setup>
// Funzione per formattare le date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

// Carica i post da Prismic
const { $prismicCustom } = useNuxtApp()
const { client } = $prismicCustom

const { data: posts, pending, error } = useAsyncData('blog-posts', () => 
  client.getByType('blog_post', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc'
    },
    pageSize: 10
  })
  .then(response => response.results || [])
  .catch(err => {
    console.error('Errore durante il caricamento dei post:', err)
    return []
  })
)

// Setup SEO per la pagina
useHead({
  title: 'Blog | MOSCANELLAMMERDA',
  meta: [
    { name: 'description', content: 'Blog di illustrazioni, vignette e design creativo di Luca Joshua Mosca.' },
    { property: 'og:title', content: 'Blog | MOSCANELLAMMERDA' },
    { property: 'og:description', content: 'Blog di illustrazioni, vignette e design creativo di Luca Joshua Mosca.' },
    { property: 'og:url', content: 'https://www.joshuarte.it/blog' }
  ]
})
</script>

<style scoped>
.loading, .error, .no-posts {
  text-align: center;
  padding: 50px 0;
}

.date {
  display: block;
  font-size: 0.85rem;
  color: #777;
  margin-top: 10px;
}

.blog-card a {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}
</style> 