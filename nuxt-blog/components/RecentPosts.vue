<template>
  <div class="recent-posts">
    <h2>{{ title || 'Articoli recenti' }}</h2>
    
    <div v-if="pending" class="loading">
      <p>Caricamento articoli...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>Si è verificato un errore nel caricamento dei contenuti.</p>
    </div>
    
    <div v-else-if="posts && posts.length > 0" class="posts-grid">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <NuxtLink :to="`/blog/${post.uid}`">
          <img 
            v-if="post.data.featured_image?.url" 
            :src="post.data.featured_image.url" 
            :alt="post.data.featured_image.alt || post.data.title"
          >
          <div class="post-card-content">
            <h3>{{ post.data.title }}</h3>
            <p>{{ post.data.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    
    <div v-else class="no-posts">
      <p>Nessun articolo pubblicato. Torna presto!</p>
    </div>
    
    <div v-if="showViewAll && posts && posts.length > 0" class="view-all">
      <NuxtLink to="/blog" class="btn">Vedi tutti gli articoli</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  limit: {
    type: Number,
    default: 3
  },
  showViewAll: {
    type: Boolean,
    default: true
  }
})

// Carica i post da Prismic
const { $prismicCustom } = useNuxtApp()
const { client } = $prismicCustom

const { data: posts, pending, error } = useAsyncData('recent-posts', () => 
  client.getByType('blog_post', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc'
    },
    pageSize: props.limit
  })
  .then(response => response.results || [])
  .catch(err => {
    console.error('Errore durante il caricamento dei post:', err)
    return []
  })
)
</script>

<style scoped>
.recent-posts {
  margin: 40px 0;
}

.recent-posts h2 {
  margin-bottom: 20px;
  text-align: center;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.post-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.post-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.post-card-content {
  padding: 15px;
}

.post-card-content h3 {
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.post-card-content p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.loading, .error, .no-posts {
  text-align: center;
  padding: 20px 0;
}

.view-all {
  text-align: center;
  margin-top: 30px;
}
</style> 