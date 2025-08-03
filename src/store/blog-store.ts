import { create } from 'zustand'
import { Article, ArticleFilters } from '@/lib/api/articles'

interface BlogState {
  // Articles state
  articles: Article[]
  featuredArticles: Article[]
  currentArticle: Article | null
  articlesLoading: boolean
  articlesError: string | null
  
  // Filters state
  filters: ArticleFilters
  searchQuery: string
  selectedCategory: string | null
  
  // Pagination state
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  
  // UI state
  isSearchOpen: boolean
  isMobileMenuOpen: boolean
  
  // Actions
  setArticles: (articles: Article[]) => void
  setFeaturedArticles: (articles: Article[]) => void
  setCurrentArticle: (article: Article | null) => void
  setArticlesLoading: (loading: boolean) => void
  setArticlesError: (error: string | null) => void
  
  // Filter actions
  setFilters: (filters: Partial<ArticleFilters>) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (categoryId: string | null) => void
  clearFilters: () => void
  
  // Pagination actions
  setCurrentPage: (page: number) => void
  setPagination: (pagination: {
    currentPage: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }) => void
  
  // UI actions
  setSearchOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
  
  // Complex actions
  addArticle: (article: Article) => void
  updateArticle: (id: string, updates: Partial<Article>) => void
  removeArticle: (id: string) => void
  
  // Like/bookmark actions
  toggleArticleLike: (id: string, liked: boolean, likesCount: number) => void
  toggleArticleBookmark: (id: string, bookmarked: boolean) => void
}

const initialFilters: ArticleFilters = {
  status: 'PUBLISHED',
  page: 1,
  limit: 10,
  sortBy: 'publishedAt',
  sortOrder: 'desc'
}

export const useBlogStore = create<BlogState>((set) => ({
  // Initial state
  articles: [],
  featuredArticles: [],
  currentArticle: null,
  articlesLoading: false,
  articlesError: null,
  
  filters: initialFilters,
  searchQuery: '',
  selectedCategory: null,
  
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
  
  isSearchOpen: false,
  isMobileMenuOpen: false,
  
  // Basic setters
  setArticles: (articles) => set({ articles }),
  setFeaturedArticles: (featuredArticles) => set({ featuredArticles }),
  setCurrentArticle: (currentArticle) => set({ currentArticle }),
  setArticlesLoading: (articlesLoading) => set({ articlesLoading }),
  setArticlesError: (articlesError) => set({ articlesError }),
  
  // Filter actions
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  
  setSearchQuery: (searchQuery) => set((state) => ({
    searchQuery,
    filters: { ...state.filters, search: searchQuery, page: 1 }
  })),
  
  setSelectedCategory: (categoryId) => set((state) => ({
    selectedCategory: categoryId,
    filters: { ...state.filters, categoryId: categoryId || undefined, page: 1 }
  })),
  
  clearFilters: () => set({
    filters: initialFilters,
    searchQuery: '',
    selectedCategory: null,
    currentPage: 1
  }),
  
  // Pagination actions
  setCurrentPage: (page) => set((state) => ({
    currentPage: page,
    filters: { ...state.filters, page }
  })),
  
  setPagination: (pagination) => set({
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    hasNextPage: pagination.hasNextPage,
    hasPrevPage: pagination.hasPrevPage
  }),
  
  // UI actions
  setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
  setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
  
  // Complex actions
  addArticle: (article) => set((state) => ({
    articles: [article, ...state.articles]
  })),
  
  updateArticle: (id, updates) => set((state) => ({
    articles: state.articles.map(article =>
      article.id === id ? { ...article, ...updates } : article
    ),
    currentArticle: state.currentArticle?.id === id
      ? { ...state.currentArticle, ...updates }
      : state.currentArticle
  })),
  
  removeArticle: (id) => set((state) => ({
    articles: state.articles.filter(article => article.id !== id),
    currentArticle: state.currentArticle?.id === id ? null : state.currentArticle
  })),
  
  // Like/bookmark actions
  toggleArticleLike: (id, liked, likesCount) => set((state) => {
    const updateLike = (article: Article) => {
      if (article.id === id) {
        return {
          ...article,
          _count: {
            ...article._count,
            likes: likesCount
          }
        }
      }
      return article
    }
    
    return {
      articles: state.articles.map(updateLike),
      featuredArticles: state.featuredArticles.map(updateLike),
      currentArticle: state.currentArticle ? updateLike(state.currentArticle) : null
    }
  }),
  
  toggleArticleBookmark: (id, bookmarked) => set((state) => {
    // For now, we don't track bookmark count in the UI
    // but we could extend this in the future
    console.log(`Bookmark toggled for article ${id}: ${bookmarked}`)
    return state
  })
}))

// Selectors for easier access to computed values
export const useBlogSelectors = () => {
  const store = useBlogStore()
  
  return {
    // Computed values
    hasArticles: store.articles.length > 0,
    hasFeaturedArticles: store.featuredArticles.length > 0,
    isLoading: store.articlesLoading,
    hasError: !!store.articlesError,
    
    // Filter status
    hasActiveFilters: (
      store.searchQuery ||
      store.selectedCategory ||
      store.filters.featured !== undefined
    ),
    
    // Pagination helpers
    canGoNext: store.hasNextPage,
    canGoPrev: store.hasPrevPage,
    totalResults: store.totalPages * (store.filters.limit || 10),
    
    // UI state
    isSearchActive: store.isSearchOpen || !!store.searchQuery,
    
    ...store
  }
}
