<template>
    <div v-if="post" class="blog-post container">    <div class="post-header">      <h1>{{ post.data.article_title }}</h1>      <div class="meta">        <span class="date">{{ formatDate(post.first_publication_date) }}</span>        <span v-if="post.data.author" class="author">di {{ post.data.author }}</span>      </div>    </div>
    
    <img 
      v-if="post.data.featured_image?.url" 
      :src="post.data.featured_image.url" 
      :alt="post.data.featured_image.alt || post.data.title"
      class="featured-image"
    >
    
    <!-- Rendering delle slice con SliceZone -->
    <SliceZone v-if="post.data.slices" :slices="post.data.slices" :components="components" />
    
    <!-- Contenuto alternativo se non ci sono slice -->
    <div v-else-if="post.data.content" class="post-content" v-html="post.data.content"></div>
    <div v-else class="no-content">Nessun contenuto disponibile.</div>
    
    <div v-if="post.data.tags && post.data.tags.length > 0" class="tags">
      <span v-for="tag in post.data.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
    
    <div class="post-footer">
      <NuxtLink to="/blog" class="btn back-button">Torna al blog</NuxtLink>
    </div>
  </div>
  
  <div v-else-if="pending" class="loading container">
    <p>Caricamento articolo...</p>
  </div>
  
  <div v-else class="error container">
    <h1>Articolo non trovato</h1>
    <p>L'articolo che stai cercando non esiste o è stato rimosso.</p>
    <NuxtLink to="/blog" class="btn">Torna al blog</NuxtLink>
  </div>
</template>

<script setup>
import { components } from '~/slices';

const route = useRoute();
const { uid } = route.params;

// Funzione per formattare le date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

// Carica il post da Prismic
const prismic = usePrismic();

const { data: post, pending, error } = useAsyncData(`articles-${uid}`, async () => {
  try {
    // Ottieni solo dal tipo articles (blog_post non esiste)
    return await prismic.client.getByUID('articles', uid);
  } catch (e) {
    console.error('Errore durante il caricamento dell\'articolo:', e);
    return null;
  }
});

// Setup SEO dinamico per la pagina
useHead(() => {
  if (!post.value) return {}
  
  return {
    title: `${post.value.data.title || post.value.data.article_title || 'Articolo'} | Blog Joshua Rte`,
    meta: [
      { name: 'description', content: post.value.data.description || 'Articolo del blog Joshua Rte' },
      { property: 'og:title', content: post.value.data.title || post.value.data.article_title },
      { property: 'og:description', content: post.value.data.description || 'Articolo del blog Joshua Rte' },
      { property: 'og:url', content: `https://www.joshuarte.it/blog/${uid}` },
      { property: 'og:image', content: post.value.data.featured_image?.url || 'https://www.joshuarte.it/images/bg.jpg' },
      { property: 'og:type', content: 'article' },
      { property: 'article:published_time', content: post.value.first_publication_date },
      { property: 'article:modified_time', content: post.value.last_publication_date }
    ]
  }
})
</script>

<style scoped>
.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.post-header {
  margin-bottom: 30px;
}

.meta {
  color: #666;
  margin: 10px 0 20px;
  font-size: 0.9rem;
}

.author {
  margin-left: 15px;
}

.featured-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 30px;
}

.post-content {
  line-height: 1.8;
  font-size: 1.1rem;
}

.no-content {
  text-align: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  font-style: italic;
  color: #666;
}

.tags {
  margin: 40px 0 20px;
}

.tag {
  display: inline-block;
  background-color: #f0f0f0;
  color: #666;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  margin-right: 8px;
  margin-bottom: 8px;
}

.post-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.back-button {
  margin-top: 20px;
}

.loading, .error {
  text-align: center;
  padding: 80px 20px;
}
</style> 