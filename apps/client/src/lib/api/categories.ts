import { apiRequest } from './articles'

// Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  createdAt: string
  updatedAt: string
  _count: {
    articles: number
  }
}

export interface CategoryFilters {
  search?: string
  page?: number
  limit?: number
  sortBy?: 'name' | 'createdAt' | 'articlesCount'
  sortOrder?: 'asc' | 'desc'
}

export interface ApiResponse<T> {
  data: T
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  message?: string
}

// Categories API
export const categoriesApi = {
  // Get all categories with optional filters
  async getAll(filters?: CategoryFilters): Promise<ApiResponse<Category[]>> {
    const searchParams = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    const query = searchParams.toString()
    const endpoint = query ? `/categories?${query}` : '/categories'
    
    return apiRequest<ApiResponse<Category[]>>(endpoint)
  },

  // Get single category by ID
  async getById(id: string): Promise<Category> {
    return apiRequest<Category>(`/categories/${id}`)
  },

  // Get single category by slug
  async getBySlug(slug: string): Promise<Category> {
    return apiRequest<Category>(`/categories/slug/${slug}`)
  },

  // Create new category
  async create(categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'slug' | '_count'>): Promise<Category> {
    return apiRequest<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    })
  },

  // Update category
  async update(id: string, categoryData: Partial<Category>): Promise<Category> {
    return apiRequest<Category>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    })
  },

  // Delete category
  async delete(id: string): Promise<void> {
    return apiRequest<void>(`/categories/${id}`, {
      method: 'DELETE',
    })
  },

  // Get popular categories
  async getPopular(limit?: number): Promise<Category[]> {
    const endpoint = limit ? `/categories/popular?limit=${limit}` : '/categories/popular'
    return apiRequest<Category[]>(endpoint)
  },
}
