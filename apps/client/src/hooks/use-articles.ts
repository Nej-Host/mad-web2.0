import { useEffect, useCallback, useRef } from 'react'
import { articlesApi, type Article, type ArticlesFilters } from '@/lib/api/articles'
import { useBlogStore } from '@/store/blog-store'

export function useArticles(filters?: ArticlesFilters) {
  const {
    articles,
    isLoading,
    error,
    pagination,
    setArticles,
    setLoading,
    setError,
    setPagination,
    addArticle,
    updateArticle,
    removeArticle
  } = useBlogStore()

  // Fetch articles
  const fetchArticles = useCallback(async (newFilters?: ArticlesFilters) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await articlesApi.getAll(newFilters || filters)
      setArticles(response.data.articles || [])
      setPagination(response.data.pagination!)
    } catch (error) {
      console.error('Failed to fetch articles:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch articles')
    } finally {
      setLoading(false)
    }
  }, [filters, setArticles, setLoading, setError, setPagination])

  // Create article
  const createArticle = async (articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'slug'>) => {
    try {
      const newArticle = await articlesApi.create(articleData)
      addArticle(newArticle)
      // Note: In a real app, you might want to show a success message
      return newArticle
    } catch (error) {
      console.error('Failed to create article:', error)
      setError(error instanceof Error ? error.message : 'Failed to create article')
      throw error
    }
  }

  // Update article
  const updateArticleById = async (id: string, articleData: Partial<Article>) => {
    try {
      const updatedArticle = await articlesApi.update(id, articleData)
      updateArticle(id, updatedArticle)
      return updatedArticle
    } catch (error) {
      console.error('Failed to update article:', error)
      setError(error instanceof Error ? error.message : 'Failed to update article')
      throw error
    }
  }

  // Delete article
  const deleteArticle = async (id: string) => {
    try {
      await articlesApi.delete(id)
      removeArticle(id)
    } catch (error) {
      console.error('Failed to delete article:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete article')
      throw error
    }
  }

  // Get single article
  const getArticle = async (id: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const article = await articlesApi.getById(id)
      return article
    } catch (error) {
      console.error('Failed to fetch article:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch article')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Get article by slug
  const getArticleBySlug = async (slug: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const article = await articlesApi.getBySlug(slug)
      return article
    } catch (error) {
      console.error('Failed to fetch article:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch article')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Auto-fetch on mount or filter change
  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  return {
    articles,
    isLoading,
    error,
    pagination,
    fetchArticles,
    createArticle,
    updateArticle: updateArticleById,
    deleteArticle,
    getArticle,
    getArticleBySlug,
    refetch: () => fetchArticles()
  }
}

// Simplified hook for just getting articles data
export function useArticlesData(filters?: ArticlesFilters) {
  const { articles, isLoading, error, pagination } = useBlogStore()
  const { fetchArticles } = useArticles(filters)

  // Auto-fetch articles on mount - use useRef to prevent infinite loop
  const hasInitialized = useRef(false)
  
  useEffect(() => {
    if (!hasInitialized.current && !articles.length && !isLoading) {
      hasInitialized.current = true
      fetchArticles()
    }
  }, [fetchArticles, articles.length, isLoading])

  return {
    articles,
    isLoading,
    error,
    pagination,
    refetch: fetchArticles
  }
}
