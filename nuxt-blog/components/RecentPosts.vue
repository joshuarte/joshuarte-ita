<template>
  <div>
    <div v-if="pending" class="loading">Caricamento articoli...</div>
    <div v-else-if="error" class="error">Si è verificato un errore nel caricamento degli articoli.</div>
    <div v-else-if="posts && posts.length" class="grid">
      <NuxtLink 
        v-for="post in posts" 
        :key="post.id" 
        :to="`/blog/${post.uid}`" 
        class="card"
      >
        <img 
          :src="post.featured_image || '/placeholder-blog.jpg'" 
          :alt="post.title" 
          class="post-image" 
        />
        <div class="card-content">
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt }}</p>
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.date) }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
    <div v-else class="no-content">
      Nessun articolo disponibile al momento.
    </div>
  </div>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app';

const props = defineProps({
  limit: {
    type: Number,
    default: 3
  }
});

// Formatta la data in formato locale italiano
const formatDate = (date) => {
  if (!date) return '';
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('it-IT', options);
};

// Recupera gli articoli del blog da Prismic
const { data: posts, pending, error } = useAsyncData('recent-posts', async () => {
  try {
    // Utilizzo il client personalizzato o quello ufficiale in base a quale è disponibile
    const nuxtApp = useNuxtApp();
    
    // Determina quale client usare
    let client = null;
    
    if (nuxtApp.$prismicCustom) {
      client = nuxtApp.$prismicCustom;
    } else if (nuxtApp.$prismic && nuxtApp.$prismic.client) {
      client = nuxtApp.$prismic.client;
    } else if (nuxtApp.$prismic) {
      client = nuxtApp.$prismic;
    }
    
    if (!client) {
      throw new Error('Nessun client Prismic disponibile');
    }
    
    const response = await client.getAllByType('blog_post', {
      orderings: [
        { field: 'document.first_publication_date', direction: 'desc' }
      ],
      pageSize: props.limit
    });
    
    return response.map(post => ({
      id: post.id,
      uid: post.uid,
      title: post.data.title || 'Articolo senza titolo',
      excerpt: post.data.excerpt || post.data.description || 'Nessuna descrizione disponibile',
      featured_image: post.data.featured_image?.url || '',
      date: post.first_publication_date || post.data.date
    }));
  } catch (e) {
    console.error('Errore nel recupero degli articoli:', e);
    return [];
  }
});
</script>

<style scoped>
.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  font-size: 0.85rem;
  color: #666;
}

.post-date {
  font-style: italic;
}

.loading, .error, .no-content {
  text-align: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 20px 0;
}

.error {
  color: #e74c3c;
}
</style> 