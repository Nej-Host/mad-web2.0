import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

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

interface BlogState {
  // Articles
  articles: Article[]
  currentArticle: Article | null
  
  // Categories
  categories: Category[]
  
  // Filters and pagination
  filters: ArticlesFilters
  pagination: Pagination
  
  // UI state
  isLoading: boolean
  error: string | null
  
  // Actions
  setArticles: (articles: Article[]) => void
  addArticle: (article: Article) => void
  updateArticle: (id: string, article: Article) => void
  removeArticle: (id: string) => void
  setCurrentArticle: (article: Article | null) => void
  
  setCategories: (categories: Category[]) => void
  addCategory: (category: Category) => void
  updateCategory: (id: string, category: Category) => void
  removeCategory: (id: string) => void
  
  setFilters: (filters: ArticlesFilters) => void
  setPagination: (pagination: Pagination) => void
  
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Utility actions
  clearState: () => void
  resetFilters: () => void
}

const initialState = {
  articles: [],
  currentArticle: null,
  categories: [],
  filters: {
    page: 1,
    limit: 10,
    sortBy: 'createdAt' as const,
    sortOrder: 'desc' as const,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  },
  isLoading: false,
  error: null,
}

export const useBlogStore = create<BlogState>()(
  devtools(
    (set) => ({
      ...initialState,

      // Article actions
      setArticles: (articles) => set({ articles }),
      
      addArticle: (article) => set((state) => ({
        articles: [article, ...state.articles]
      })),
      
      updateArticle: (id, article) => set((state) => ({
        articles: state.articles.map(a => a.id === id ? article : a),
        currentArticle: state.currentArticle?.id === id ? article : state.currentArticle
      })),
      
      removeArticle: (id) => set((state) => ({
        articles: state.articles.filter(a => a.id !== id),
        currentArticle: state.currentArticle?.id === id ? null : state.currentArticle
      })),
      
      setCurrentArticle: (article) => set({ currentArticle: article }),

      // Category actions
      setCategories: (categories) => set({ categories }),
      
      addCategory: (category) => set((state) => ({
        categories: [...state.categories, category]
      })),
      
      updateCategory: (id, category) => set((state) => ({
        categories: state.categories.map(c => c.id === id ? category : c)
      })),
      
      removeCategory: (id) => set((state) => ({
        categories: state.categories.filter(c => c.id !== id)
      })),

      // Filter and pagination actions
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),
      
      setPagination: (pagination) => set({ pagination }),

      // UI state actions
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Utility actions
      clearState: () => set(initialState),
      
      resetFilters: () => set((state) => ({
        filters: {
          page: 1,
          limit: state.filters.limit || 10,
          sortBy: 'createdAt',
          sortOrder: 'desc',
        }
      })),
    }),
    {
      name: 'blog-store',
    }
  )
)
