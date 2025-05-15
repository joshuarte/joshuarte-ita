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
            :alt="post.data.featured_image.alt || getArticleTitle(post)"
          >
          <div class="blog-card-content">
            <h2>{{ getArticleTitle(post) }}</h2>
            <p>{{ post.data.description || getArticleExcerpt(post) }}</p>
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

// Funzione per estrarre il titolo dell'articolo
const getArticleTitle = (post) => {
  // Prima controlla se c'è un titolo diretto
  if (post.data.title || post.data.article_title) {
    return post.data.title || post.data.article_title;
  }
  
  // Altrimenti cerca nelle slice
  if (post.data.slices && post.data.slices.length > 0) {
    const articleSlice = post.data.slices.find(slice => slice.slice_type === 'article');
    if (articleSlice && articleSlice.primary) {
      return articleSlice.primary.article_title || articleSlice.primary.article || 'Articolo senza titolo';
    }
  }
  
  return 'Articolo senza titolo';
}

// Funzione per estrarre l'estratto dell'articolo
const getArticleExcerpt = (post) => {
  if (post.data.description) return post.data.description;
  
  if (post.data.slices && post.data.slices.length > 0) {
    const articleSlice = post.data.slices.find(slice => slice.slice_type === 'article');
    if (articleSlice && articleSlice.primary && articleSlice.primary.article) {
      // Prendi i primi 150 caratteri come estratto
      const excerpt = articleSlice.primary.article.substring(0, 150);
      return excerpt + (articleSlice.primary.article.length > 150 ? '...' : '');
    }
  }
  
  return 'Nessuna descrizione disponibile';
}

// Carica i post da Prismic usando il client ufficiale
const prismic = usePrismic();

const { data: posts, pending, error } = useAsyncData('blog-posts', async () => {
  try {
    // Ottiene articoli dal tipo articles
    return await prismic.client.getAllByType('articles', {
      orderings: [
        { field: 'document.first_publication_date', direction: 'desc' }
      ],
      pageSize: 10
    })
  } catch(err) {
    console.error('Errore durante il caricamento degli articoli:', err)
    return []
  }
})

// Setup SEO per la pagina
useHead({
  title: 'Blog | Joshua Rte.',
  meta: [
    { name: 'description', content: 'Blog di Joshua Rte. - Articoli, progetti e idee sul mondo del web development e design.' },
    { property: 'og:title', content: 'Blog | Joshua Rte.' },
    { property: 'og:description', content: 'Blog di Joshua Rte. - Articoli, progetti e idee sul mondo del web development e design.' },
    { property: 'og:url', content: 'https://www.joshuarte.it/blog' }
  ]
})
</script>

<style scoped>
.loading, .error, .no-posts {
  text-align: center;
  padding: 50px 0;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin: 40px 0;
}

.blog-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.blog-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-card-content {
  padding: 20px;
}

.blog-card h2 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.4rem;
}

.blog-card p {
  color: #666;
  margin-bottom: 20px;
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

.hero {
  text-align: center;
  padding: 60px 0 30px;
  background-color: #f9f9f9;
  margin-bottom: 40px;
  border-radius: 0 0 8px 8px;
}

.hero h1 {
  margin-bottom: 15px;
}
</style> 