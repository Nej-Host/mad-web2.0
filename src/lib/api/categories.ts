// Categories API types and functions
export interface Category {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    articles: number
  }
}

export interface CreateCategoryData {
  name: string
  slug: string
  description: string
  color?: string
  icon?: string
}

export interface UpdateCategoryData {
  name?: string
  slug?: string
  description?: string
  color?: string
  icon?: string
  isActive?: boolean
}

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

// Helper function for API requests (reused from articles.ts)
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string }> {
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

// Categories API
export const categoriesApi = {
  // Get all categories
  getCategories: async () => {
    return apiRequest<Category[]>('/api/categories')
  },

  // Get single category
  getCategory: async (id: string) => {
    return apiRequest<Category>(`/api/categories/${id}`)
  },

  // Get category by slug
  getCategoryBySlug: async (slug: string) => {
    return apiRequest<Category>(`/api/categories/slug/${slug}`)
  },

  // Create new category (admin only)
  createCategory: async (data: CreateCategoryData) => {
    return apiRequest<Category>('/api/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Update category (admin only)
  updateCategory: async (id: string, data: UpdateCategoryData) => {
    return apiRequest<Category>(`/api/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // Delete category (admin only)
  deleteCategory: async (id: string) => {
    return apiRequest<void>(`/api/categories/${id}`, {
      method: 'DELETE',
    })
  },

  // Get active categories only
  getActiveCategories: async () => {
    return apiRequest<Category[]>('/api/categories?active=true')
  }
}

export default categoriesApi
