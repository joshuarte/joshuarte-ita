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

// Recupera gli articoli dal client Prismic
const prismic = usePrismic();

const { data: articlesData, pending, error } = useAsyncData('articles', async () => {
  try {
    // Ottieni articoli dal tipo articles
    return await prismic.client.getAllByType('articles', {
      orderings: [
        { field: 'document.first_publication_date', direction: 'desc' }
      ],
      pageSize: props.limit
    });
  } catch(err) {
    console.error('Errore durante il caricamento degli articoli:', err);
    return [];
  }
});

// Trasforma i dati in un formato più semplice da usare nel template
const posts = computed(() => {
  if (!articlesData.value) return [];
  
  return articlesData.value.map(article => {
    // Estrai il titolo e il contenuto dalle slices
    let title = article.data.article_title || '';
    let excerpt = article.data.description || '';
    
    // Se non c'è un titolo diretto, cerca nelle slices
    if (!title && article.data.slices && article.data.slices.length > 0) {
      const articleSlice = article.data.slices.find(slice => slice.slice_type === 'article');
      if (articleSlice && articleSlice.primary) {
        // Usa il campo article come titolo se article_title non è disponibile
        title = articleSlice.primary.article_title || articleSlice.primary.article || 'Articolo senza titolo';
      }
    }
    
    // Se ancora non abbiamo un titolo, usa un valore predefinito
    if (!title) {
      title = 'Articolo senza titolo';
    }
    
    return {
      id: article.id,
      uid: article.uid,
      title: title,
      excerpt: excerpt || 'Nessuna descrizione disponibile',
      featured_image: article.data.featured_image?.url || '',
      date: article.first_publication_date || article.data.date
    };
  });
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