// API Base Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

// Types
export interface Article {
  id: string
  title: string
  content: string
  excerpt?: string
  slug: string
  coverImage?: string
  status: 'draft' | 'published' | 'archived'
  publishedAt?: string
  createdAt: string
  updatedAt: string
  authorId: string
  categoryId?: string
  views: number
  featured: boolean
  author: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  category?: {
    id: string
    name: string
    slug: string
  }
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
  _count: {
    likes: number
    comments: number
  }
}

export interface ArticlesFilters {
  categoryId?: string
  authorId?: string
  status?: string
  featured?: boolean
  search?: string
  tags?: string[]
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'publishedAt' | 'views' | 'title'
  sortOrder?: 'asc' | 'desc'
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiResponse<T> {
  data: T
  pagination?: Pagination
  message?: string
}

export interface ArticlesApiResponse {
  success: boolean
  data: {
    articles: Article[]
    pagination: Pagination
  }
  message?: string
}

// Helper function for API requests
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  // Get auth token from localStorage if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// Articles API
export const articlesApi = {
  // Get all articles with optional filters
  async getAll(filters?: ArticlesFilters): Promise<ArticlesApiResponse> {
    const searchParams = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(key, item.toString()))
          } else {
            searchParams.append(key, value.toString())
          }
        }
      })
    }
    
    const query = searchParams.toString()
    const endpoint = query ? `/articles?${query}` : '/articles'
    
    return apiRequest<ArticlesApiResponse>(endpoint)
  },

  // Get single article by ID
  async getById(id: string): Promise<Article> {
    return apiRequest<Article>(`/articles/${id}`)
  },

  // Get single article by slug
  async getBySlug(slug: string): Promise<Article> {
    return apiRequest<Article>(`/articles/slug/${slug}`)
  },

  // Create new article
  async create(articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Promise<Article> {
    return apiRequest<Article>('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    })
  },

  // Update article
  async update(id: string, articleData: Partial<Article>): Promise<Article> {
    return apiRequest<Article>(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    })
  },

  // Delete article
  async delete(id: string): Promise<void> {
    return apiRequest<void>(`/articles/${id}`, {
      method: 'DELETE',
    })
  },

  // Get featured articles
  async getFeatured(limit?: number): Promise<Article[]> {
    const endpoint = limit ? `/articles/featured?limit=${limit}` : '/articles/featured'
    return apiRequest<Article[]>(endpoint)
  },

  // Get popular articles
  async getPopular(limit?: number): Promise<Article[]> {
    const endpoint = limit ? `/articles/popular?limit=${limit}` : '/articles/popular'
    return apiRequest<Article[]>(endpoint)
  },

  // Get recent articles
  async getRecent(limit?: number): Promise<Article[]> {
    const endpoint = limit ? `/articles/recent?limit=${limit}` : '/articles/recent'
    return apiRequest<Article[]>(endpoint)
  },

  // Search articles
  async search(query: string, filters?: Omit<ArticlesFilters, 'search'>): Promise<ApiResponse<Article[]>> {
    const searchParams = new URLSearchParams({ search: query })
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(key, item.toString()))
          } else {
            searchParams.append(key, value.toString())
          }
        }
      })
    }
    
    return apiRequest<ApiResponse<Article[]>>(`/articles/search?${searchParams.toString()}`)
  },

  // Like/unlike article
  async toggleLike(id: string): Promise<{ liked: boolean; likesCount: number }> {
    return apiRequest<{ liked: boolean; likesCount: number }>(`/articles/${id}/like`, {
      method: 'POST',
    })
  },

  // Increment view count
  async incrementViews(id: string): Promise<void> {
    return apiRequest<void>(`/articles/${id}/view`, {
      method: 'POST',
    })
  },
}
