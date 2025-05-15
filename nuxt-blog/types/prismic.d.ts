// Tipi per i documenti Prismic
import { Content } from '@prismicio/client'

// Blog Post
type BlogPostDocument = Content.BlogPostDocument

// Schema dei documenti del blog
interface BlogPostData {
  title: string
  description?: string
  author?: string
  featured_image?: {
    url: string
    alt?: string
  }
  content: any
  tags?: string[]
}

// Estendi i tipi di Prismic
declare module '@prismicio/client' {
  interface PrismicDocumentTypes {
    blog_post: BlogPostDocument
  }
  
  namespace Content {
    interface BlogPostDocument extends PrismicDocument {
      data: BlogPostData
    }
  }
} 