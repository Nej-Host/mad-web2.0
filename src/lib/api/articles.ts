// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Array<{
    field: string
    message: string
  }>
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  coverImage: string | null
  authorId: string
  categoryId: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  featured: boolean
  views: number
  readTime: number
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  author: {
    id: string
    firstName: string
    lastName: string
    imageUrl: string | null
  }
  category: {
    id: string
    name: string
    slug: string
    description: string
    color: string
    icon: string | null
  }
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
  _count: {
    comments: number
    likes: number
    bookmarks: number
  }
}

export interface ArticleFilters {
  categoryId?: string
  featured?: boolean
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  search?: string
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'publishedAt' | 'views' | 'title'
  sortOrder?: 'asc' | 'desc'
}

export interface ArticlesResponse {
  articles: Article[]
  pagination: PaginationMeta
}

export interface CreateArticleData {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  categoryId: string
  tags?: string[]
  featured?: boolean
}

export interface UpdateArticleData {
  title?: string
  content?: string
  excerpt?: string
  coverImage?: string
  categoryId?: string
  tags?: string[]
  featured?: boolean
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
}

// Helper function to handle API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Request failed:', error)
    throw error
  }
}

// Articles API
export const articlesApi = {
  // Get articles list
  getArticles: async (filters: ArticleFilters = {}): Promise<ApiResponse<ArticlesResponse>> => {
    const searchParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })

    const query = searchParams.toString()
    return apiRequest<ArticlesResponse>(`/api/articles${query ? `?${query}` : ''}`)
  },

  // Get single article
  getArticle: async (id: string): Promise<ApiResponse<Article>> => {
    return apiRequest<Article>(`/api/articles/${id}`)
  },

  // Create new article (admin only)
  createArticle: async (data: CreateArticleData): Promise<ApiResponse<Article>> => {
    return apiRequest<Article>('/api/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Update article (admin only)
  updateArticle: async (id: string, data: UpdateArticleData): Promise<ApiResponse<Article>> => {
    return apiRequest<Article>(`/api/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // Delete article (admin only)
  deleteArticle: async (id: string): Promise<ApiResponse<void>> => {
    return apiRequest<void>(`/api/articles/${id}`, {
      method: 'DELETE',
    })
  },

  // Toggle article like
  toggleLike: async (id: string): Promise<ApiResponse<{ liked: boolean; likesCount: number }>> => {
    return apiRequest<{ liked: boolean; likesCount: number }>(`/api/articles/${id}/like`, {
      method: 'POST',
    })
  },

  // Toggle article bookmark
  toggleBookmark: async (id: string): Promise<ApiResponse<{ bookmarked: boolean }>> => {
    return apiRequest<{ bookmarked: boolean }>(`/api/articles/${id}/bookmark`, {
      method: 'POST',
    })
  },

  // Get featured articles
  getFeaturedArticles: async (limit = 5): Promise<ApiResponse<ArticlesResponse>> => {
    return articlesApi.getArticles({ featured: true, limit, status: 'PUBLISHED' })
  },

  // Get latest articles
  getLatestArticles: async (limit = 10): Promise<ApiResponse<ArticlesResponse>> => {
    return articlesApi.getArticles({ 
      limit, 
      status: 'PUBLISHED', 
      sortBy: 'publishedAt', 
      sortOrder: 'desc' 
    })
  },

  // Search articles
  searchArticles: async (query: string, limit = 10): Promise<ApiResponse<ArticlesResponse>> => {
    return articlesApi.getArticles({ search: query, limit, status: 'PUBLISHED' })
  },

  // Get articles by category
  getArticlesByCategory: async (categoryId: string, limit = 10): Promise<ApiResponse<ArticlesResponse>> => {
    return articlesApi.getArticles({ categoryId, limit, status: 'PUBLISHED' })
  }
}

export default articlesApi
